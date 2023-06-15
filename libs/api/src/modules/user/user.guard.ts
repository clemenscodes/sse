import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}
    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.authService.publicCheck(context);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const { user, params } = request;
        if (!user) {
            throw new UnauthorizedException();
        }
        if (user.userId !== params.userId) {
            throw new UnauthorizedException();
        }
        return true;
    }
}
