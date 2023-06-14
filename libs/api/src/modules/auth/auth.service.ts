import {
    forwardRef,
    HttpStatus,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/api';
import { LoginSchema, UserSchema } from '@types';
import { Response } from 'express';
import { CookiePayload, CookieService } from '../cookie/cookie.service';
import { HashService } from '../hash/hash.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { SessionService } from '../session/session.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        @Inject(forwardRef(() => CookieService))
        private readonly cookieService: CookieService,
        @Inject(forwardRef(() => SessionService))
        private readonly sessionService: SessionService,
        @Inject(forwardRef(() => RefreshTokenService))
        private readonly refreshTokenService: RefreshTokenService,
        private readonly hashService: HashService
    ) {}
    async register(
        data: UserSchema,
        res: Response,
        cookies?: string
    ): Promise<{
        message: string;
        email?: User['email'];
        name?: User['username'];
    }> {
        const [session, message] = await this.cookieService.checkCookies(
            res,
            cookies
        );
        if (session) {
            return { message };
        }
        const { password } = data;
        const { username } = await this.userService.create(data);
        return await this.login({ username, password }, res, cookies);
    }

    async login(
        { username, password }: LoginSchema,
        res: Response,
        cookies?: string
    ): Promise<{
        message: string;
        email?: User['email'];
        name?: User['username'];
    }> {
        const [session, message] = await this.cookieService.checkCookies(
            res,
            cookies
        );
        if (session) {
            return { message };
        }
        const user = await this.userService.findByUsername(username);
        const passwordMatch = await this.hashService.verifyPassword({
            hash: user.password,
            password,
            salt: user.salt,
        });
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const { email, username: name, id } = user;
        const sessionToken = await this.sessionService.create(id);
        let refreshToken = await this.refreshTokenService.getUserRefreshToken(
            id
        );
        if (!refreshToken) {
            refreshToken = await this.refreshTokenService.create(id);
        }
        const valid = await this.refreshTokenService.checkRefreshToken(
            refreshToken.refreshToken
        );
        if (!valid) {
            await this.refreshTokenService.delete(refreshToken.id);
            refreshToken = await this.refreshTokenService.create(id);
        }
        const sessionCookie: CookiePayload = {
            data: sessionToken.sessionToken,
            cookieName: SessionService.sessionCookieName,
            expires: sessionToken.expires,
            maxAge: SessionService.sessionDefaultTTL * 1000,
        };
        const refreshCookie: CookiePayload = {
            data: refreshToken.refreshToken,
            cookieName: RefreshTokenService.refreshCookieName,
            expires: refreshToken.expires,
            maxAge: RefreshTokenService.refreshTokenDefaultTTL * 1000,
        };
        const payloads = [sessionCookie, refreshCookie];
        this.cookieService.setCookies(payloads, res);
        res.status(HttpStatus.OK);
        return { message: 'Successfully logged in!', email, name };
    }
}
