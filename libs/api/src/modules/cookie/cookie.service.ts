import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RefreshToken, Session } from '@prisma/api';
import { fromDate } from '@utils';
import { signedCookie } from 'cookie-parser';
import { CookieOptions, Response } from 'express';
import { JwtService } from '../jwt/jwt.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { SessionService } from '../session/session.service';

export type CookiePayload = {
    data: string;
    cookieName: string;
    expires: Date;
    maxAge: number;
};

@Injectable()
export class CookieService {
    constructor(
        private readonly sessionService: SessionService,
        private readonly refreshTokenService: RefreshTokenService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    private static readonly cookieOptions: CookieOptions = {
        sameSite: 'lax',
        httpOnly: true,
        signed: true,
        path: '/',
    };

    verifyCookie(cookie: string): string | false {
        const secret = this.configService.get('SECRET');
        const signed = signedCookie(cookie, secret);
        return signed;
    }

    getSessionPayload(session: Session): CookiePayload {
        const payload = {
            data: session.sessionToken,
            cookieName: SessionService.sessionCookieName,
            expires: session.expires,
            maxAge: SessionService.sessionDefaultTTLms,
        };
        return payload;
    }

    getRefreshTokenPayload(refreshToken: RefreshToken): CookiePayload {
        const payload = {
            data: refreshToken.refreshToken,
            cookieName: RefreshTokenService.refreshCookieName,
            expires: refreshToken.expires,
            maxAge: RefreshTokenService.refreshTokenDefaultTTLms,
        };
        return payload;
    }

    getJWTPayload(jwt: string): CookiePayload {
        const payload = {
            data: jwt,
            cookieName: 'jwt',
            expires: new Date(fromDate(SessionService.sessionDefaultTTLms)),
            maxAge: SessionService.sessionDefaultTTLms,
        };
        return payload;
    }

    setCookie(payload: CookiePayload, res: Response): Response {
        const { cookieName, expires, maxAge, data } = payload;
        const domain = this.configService.get<string>('FRONTEND_DOMAIN');
        return res.cookie(cookieName, data, {
            ...CookieService.cookieOptions,
            expires,
            maxAge,
            domain,
        });
    }

    setCookies(cookies: CookiePayload[], res: Response) {
        let response = res;
        cookies.forEach((cookie) => {
            response = this.setCookie(cookie, res);
        });
        return response;
    }

    async checkCookies(
        res: Response,
        cookies?: string
    ): Promise<{
        sessionValid: boolean;
        refreshValid: boolean;
        message: string;
    }> {
        const sessionValid = await this.checkSessionCookie(res, cookies);
        if (sessionValid) {
            return {
                sessionValid: true,
                refreshValid: true,
                message: 'Session valid',
            };
        }
        const refresh = await this.checkRefreshTokenCookie(res, cookies);
        if (refresh) {
            return {
                sessionValid: false,
                refreshValid: true,
                message: 'Session refreshed',
            };
        }
        return {
            sessionValid: false,
            refreshValid: false,
            message: 'No valid session',
        };
    }

    async checkSessionCookie(
        res: Response,
        cookies?: string
    ): Promise<boolean> {
        if (!cookies) {
            return false;
        }
        const parsedCookies = JSON.parse(cookies);
        const sessionTokenName = SessionService.sessionCookieName;
        if (!(sessionTokenName in parsedCookies)) {
            return false;
        }
        const token = this.verifyCookie(
            parsedCookies[sessionTokenName] as string
        );
        if (!token) {
            return false;
        }
        const valid = await this.sessionService.checkSession(token);
        if (!valid) {
            return valid;
        }
        const session = await this.sessionService.findBySessionToken(token);
        const cookie = this.getSessionPayload(session);
        this.setCookie(cookie, res);
        return valid;
    }

    async checkRefreshTokenCookie(
        res: Response,
        cookies?: string
    ): Promise<boolean> {
        if (!cookies) {
            return false;
        }
        const parsedCookies = JSON.parse(cookies);
        const refreshTokenName = RefreshTokenService.refreshCookieName;
        if (!(refreshTokenName in parsedCookies)) {
            return false;
        }
        const token = this.verifyCookie(
            parsedCookies[refreshTokenName] as string
        );
        if (!token) {
            return false;
        }
        const valid = await this.refreshTokenService.checkRefreshToken(token);
        if (!valid) {
            return valid;
        }
        const refreshToken = await this.refreshTokenService.findByRefreshToken(
            token
        );
        const session = await this.sessionService.create(refreshToken.userId);
        const sessionCookie = this.getSessionPayload(session);
        const refreshCookie = this.getRefreshTokenPayload(refreshToken);
        const payloads = [sessionCookie, refreshCookie];
        this.setCookies(payloads, res);
        return valid;
    }
}
