import { Injectable } from '@nestjs/common';
import { RefreshToken, Session } from '@prisma/api';
import { CookieOptions, Response } from 'express';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class CookieService {
    constructor(
        private readonly sessionService: SessionService,
        private readonly refreshTokenService: RefreshTokenService
    ) {}

    private static readonly cookieOptions: CookieOptions = {
        sameSite: 'lax',
        httpOnly: true,
        signed: false,
        path: '/',
    };

    setSessionCookie(session: Session, res: Response) {
        res.cookie(SessionService.sessionCookieName, session.sessionToken, {
            ...CookieService.cookieOptions,
            expires: session.expires,
            maxAge: SessionService.sessionDefaultTTL * 1000,
        });
    }

    setRefreshTokenCookie(refreshToken: RefreshToken, res: Response) {
        res.cookie(
            RefreshTokenService.refreshCookieName,
            refreshToken.refreshToken,
            {
                ...CookieService.cookieOptions,
                expires: refreshToken.expires,
                maxAge: RefreshTokenService.refreshTokenDefaultTTL * 1000,
            }
        );
    }

    setCookies(session: Session, refreshToken: RefreshToken, res: Response) {
        res.cookie(SessionService.sessionCookieName, session.sessionToken, {
            ...CookieService.cookieOptions,
            expires: session.expires,
            maxAge: SessionService.sessionDefaultTTL * 1000,
        }).cookie(
            RefreshTokenService.refreshCookieName,
            refreshToken.refreshToken,
            {
                ...CookieService.cookieOptions,
                expires: refreshToken.expires,
                maxAge: RefreshTokenService.refreshTokenDefaultTTL * 1000,
            }
        );
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
        this.setSessionCookie(session, res);
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
        this.setCookies(session, refreshToken, res);
        return valid;
    }
}
