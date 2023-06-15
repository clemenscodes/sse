import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
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
