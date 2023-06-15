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
        const response = context.switchToHttp().getResponse();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyToken(token);
            request['user'] = payload;
        } catch (e) {
            if (
                !(
                    e instanceof Object &&
                    'name' in e &&
                    e.name === 'TokenExpiredError'
                )
            ) {
                throw new UnauthorizedException(e);
            }
            if (!request.signedCookies) {
                throw new UnauthorizedException('No cookies');
            }
            const cookies = JSON.stringify(request.signedCookies);
            const { sessionValid, refreshValid } =
                await this.cookieService.checkCookies(response, cookies);
            if (!sessionValid && !refreshValid) {
                throw new UnauthorizedException('Sessions expired');
            }
            if (!sessionValid && refreshValid) {
                // TODO: should get userid somehow and generate new jwt
                // const jwt = await this.jwtService.generateToken(payload.sub);
                // response.header('X-Refresh-JWT', jwt);
                return true;
            }
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
