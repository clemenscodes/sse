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
import { SessionService } from '../session/session.service';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authService: AuthService,
        private readonly cookieService: CookieService,
        private readonly sessionService: SessionService,
        private readonly tokenService: RefreshTokenService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.authService.publicCheck(context);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse();
        try {
            const token = this.extractTokenFromHeader(request);
            if (!token) {
                throw new UnauthorizedException('No JWT');
            }
            const payload = await this.jwtService.verifyToken(token);
            request['user'] = payload;
            return true;
        } catch (e) {
            if (
                !(e instanceof UnauthorizedException && e.message === 'No JWT')
            ) {
                throw new UnauthorizedException();
            }
            if (!request.signedCookies) {
                throw new UnauthorizedException('No cookies');
            }
            const cookies = JSON.stringify(request.signedCookies);
            const parsedCookies = JSON.parse(cookies);
            const { sessionValid, refreshValid } =
                await this.cookieService.checkCookies(response, cookies);
            if (sessionValid) {
                const cookieName = SessionService.sessionCookieName;
                const token = parsedCookies[cookieName];
                const { userId } = await this.sessionService.findBySessionToken(
                    token
                );
                const jwt = await this.jwtService.generateToken(userId);
                const payload = await this.jwtService.verifyToken(jwt);
                request['user'] = payload;
                response.header('X-Refresh-JWT', jwt);
                return true;
            }
            if (!refreshValid) {
                throw new UnauthorizedException('Sessions expired');
            }
            const cookieName = RefreshTokenService.refreshCookieName;
            const token = parsedCookies[cookieName];
            const { userId } = await this.tokenService.findByRefreshToken(
                token
            );
            const jwt = await this.jwtService.generateToken(userId);
            const payload = await this.jwtService.verifyToken(jwt);
            request['user'] = payload;
            response.header('X-Refresh-JWT', jwt);
            return true;
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
