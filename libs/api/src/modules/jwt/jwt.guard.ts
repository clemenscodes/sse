import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { CookieService } from '../cookie/cookie.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authService: AuthService,
        private readonly cookieService: CookieService,
        private readonly tokenService: RefreshTokenService
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
                const parsedCookies = JSON.parse(cookies);
                const cookieName = RefreshTokenService.refreshCookieName;
                const token = parsedCookies[cookieName];
                const { userId } = await this.tokenService.findByRefreshToken(
                    token
                );
                const jwt = await this.jwtService.generateToken(userId);
                response.header('X-Refresh-JWT', jwt);
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
