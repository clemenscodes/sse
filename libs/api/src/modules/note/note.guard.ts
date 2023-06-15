import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class NoteGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
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
