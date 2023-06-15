import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/api';
import { LoginSchema, UserSchema } from '@types';
import { Response } from 'express';
import { CookieService } from '../cookie/cookie.service';
import { HashService } from '../hash/hash.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { SessionService } from '../session/session.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly cookieService: CookieService,
        private readonly sessionService: SessionService,
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
        const payloads = [
            this.cookieService.getSessionPayload(sessionToken),
            this.cookieService.getRefreshTokenPayload(refreshToken),
        ];
        this.cookieService.setCookies(payloads, res);
        res.status(HttpStatus.OK);
        return { message: 'Successfully logged in!', email, name };
    }
}
