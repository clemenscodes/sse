import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { CookieService } from '../cookie/cookie.service';
import { JWT, JwtService } from './jwt.service';

declare module 'express' {
    interface Request {
        user?: JWT;
    }
}

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authService: AuthService,
        private readonly cookieService: CookieService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.authService.publicCheck(context);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyToken(token);
            const isExpired = this.isTokenExpired(payload);
            if (!isExpired) {
                request['user'] = payload;
                return true;
            }
            if (!request.signedCookies) {
                throw new UnauthorizedException();
            }
            const cookies = request.signedCookies;
            const [valid] = await this.cookieService.checkCookies(
                request,
                cookies
            );
            if (!valid) {
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
        return true;
    }

    private isTokenExpired(payload: JWT): boolean {
        const { exp } = payload;
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime > Number(exp);
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
