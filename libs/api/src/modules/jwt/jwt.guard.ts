import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/api';
import { Request, Response } from 'express';
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

    private readonly logger = new Logger(JwtGuard.name);

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.authService.publicCheck(context);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();
        const { url, query, params, body, method } = request;
        this.logger.debug(`${method} ${url}`);
        this.logger.debug(`Query: ${JSON.stringify(query)}`);
        this.logger.debug(`Params: ${JSON.stringify(params)}`);
        this.logger.debug(`Body: ${JSON.stringify(body)}`);
        const token = this.extractTokenFromHeader(request);
        if (token) {
            try {
                const payload = await this.jwtService.verifyToken(token);
                this.logger.log('JWT verified');
                request['user'] = payload;
                return this.authorize(payload.sub);
            } catch (e) {
                if (
                    !(e instanceof UnauthorizedException) ||
                    e.message !== 'jwt expired'
                ) {
                    this.logger.error(
                        `Something unexpected happened. This is likely a bug or vulnerability.`
                    );
                    this.logger.error(JSON.stringify(e));
                    throw new UnauthorizedException();
                }
                this.logger.warn('JWT expired');
            }
        }
        if (!Object.keys(request.signedCookies).length) {
            this.logger.error('No cookies provided');
            throw new UnauthorizedException();
        }
        const cookies = JSON.stringify(request.signedCookies);
        const parsedCookies = JSON.parse(cookies);
        const res = await this.cookieService.checkCookies(response, cookies);
        const { sessionValid, refreshValid } = res;
        if (sessionValid) {
            this.logger.log('Valid session cookie');
            const cookieName = SessionService.sessionCookieName;
            const token = parsedCookies[cookieName];
            const { userId } = await this.sessionService.findBySessionToken(
                token
            );
            await this.setRefreshJWT(userId, request, response);
            return this.authorize(userId);
        }
        this.logger.warn('Invalid session cookie');
        if (!refreshValid) {
            this.logger.error('Invalid refresh cookie');
            throw new UnauthorizedException();
        }
        this.logger.log('Valid refresh cookie');
        const cookieName = RefreshTokenService.refreshCookieName;
        const refreshToken = parsedCookies[cookieName];
        const { userId } = await this.tokenService.findByRefreshToken(
            refreshToken
        );
        await this.setRefreshJWT(userId, request, response);
        return this.authorize(userId);
    }

    private authorize(userId: User['id']) {
        this.logger.log(`Authorized ${userId}`);
        return true;
    }

    private async setRefreshJWT(
        userId: User['id'],
        request: Request,
        response: Response
    ) {
        const jwt = await this.jwtService.generateToken(userId);
        const payload = await this.jwtService.verifyToken(jwt);
        this.logger.log(`Refreshed JWT for ${userId}`);
        request['user'] = payload;
        response.header('X-Refresh-JWT', jwt);
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
