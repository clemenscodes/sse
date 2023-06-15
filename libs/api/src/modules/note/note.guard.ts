import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class NoteGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}
    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.authService.publicCheck(context);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const { user, body } = request;

        if (!user) {
            throw new UnauthorizedException('Unauthorized');
        }

        if (body.userId !== user.userId) {
            throw new UnauthorizedException('Access denied');
        }

        return true;
    }
}
