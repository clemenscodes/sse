import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CookieOptions, Response } from 'express';
import { Cookies } from '../../decorator/cookies.decorator';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { SessionService } from '../session/session.service';
import { UserPipe } from '../user/user.pipe';
import { UserService } from '../user/user.service';
import { LoginPipe } from './login.pipe';

export type LoginPayload = {
    username: Parameters<typeof UserService.prototype.login>[0];
    password: Parameters<typeof UserService.prototype.login>[1];
};

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async signUp(
        @Body(new UserPipe())
        data: Parameters<typeof this.userService.create>[0]
    ) {
        return await this.userService.register(data);
    }

    @Post('login')
    async login(
        @Cookies() reqCookies: string,
        @Body(new LoginPipe()) { username, password }: LoginPayload,
        @Res({ passthrough: true }) res: Response
    ) {
        console.log({ reqCookies });
        const { cookies } = await this.userService.login(username, password);
        const [sessionToken, refreshToken] = cookies;
        console.log({ sessionToken, refreshToken });
        const cookieOptions: CookieOptions = {
            sameSite: 'lax',
            httpOnly: true,
            signed: false,
            path: '/',
        };
        res.cookie(
            SessionService.sessionCookieName,
            sessionToken.sessionToken,
            {
                ...cookieOptions,
                expires: new Date(sessionToken.expires),
                maxAge: SessionService.sessionDefaultTTL * 1000,
            }
        ).cookie(
            RefreshTokenService.refreshCookieName,
            refreshToken.refreshToken,
            {
                ...cookieOptions,
                expires: new Date(refreshToken.expires),
                maxAge: RefreshTokenService.refreshTokenDefaultTTL * 1000,
            }
        );
        res.status(HttpStatus.OK);
        res.json({ message: 'Successfully logged in!' });
    }
}
