import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CookieOptions, Response } from 'express';
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
        private readonly configService: ConfigService
    ) {}

    private static readonly cookieOptions: CookieOptions = {
        sameSite: 'lax',
        httpOnly: true,
        signed: false,
        path: '/',
    };

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
    ): Promise<[boolean, string]> {
        const sessionValid = await this.checkSessionCookie(res, cookies);
        if (sessionValid) {
            res.status(HttpStatus.OK);
            return [true, 'User already logged in'];
        }
        const refresh = await this.checkRefreshTokenCookie(res, cookies);
        if (refresh) {
            res.status(HttpStatus.OK);
            return [true, 'Session expired, but valid refresh token!'];
        }
        return [false, 'No valid session'];
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
        const token = parsedCookies[sessionTokenName];
        const valid = await this.sessionService.checkSession(token);
        if (!valid) {
            return valid;
        }
        const session = await this.sessionService.findBySessionToken(token);
        const cookie: CookiePayload = {
            data: session.sessionToken,
            cookieName: sessionTokenName,
            expires: session.expires,
            maxAge: SessionService.sessionDefaultTTL * 1000,
        };
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
        const token = parsedCookies[refreshTokenName];
        const valid = await this.refreshTokenService.checkRefreshToken(token);
        if (!valid) {
            return valid;
        }
        const refreshToken = await this.refreshTokenService.findByRefreshToken(
            token
        );
        const session = await this.sessionService.create(refreshToken.userId);
        const sessionCookie: CookiePayload = {
            data: session.sessionToken,
            cookieName: SessionService.sessionCookieName,
            expires: session.expires,
            maxAge: SessionService.sessionDefaultTTL * 1000,
        };
        const refreshCookie: CookiePayload = {
            data: refreshToken.refreshToken,
            cookieName: refreshTokenName,
            expires: refreshToken.expires,
            maxAge: RefreshTokenService.refreshTokenDefaultTTL * 1000,
        };
        const payloads = [sessionCookie, refreshCookie];
        this.setCookies(payloads, res);
        return valid;
    }
}
