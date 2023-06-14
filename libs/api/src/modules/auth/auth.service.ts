import { createHmac, randomBytes } from 'crypto';
import {
    forwardRef,
    HttpStatus,
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, User } from '@prisma/api';
import { argon2id, hash, Options, verify } from 'argon2';
import { Response } from 'express';
import { CookiePayload, CookieService } from '../cookie/cookie.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { SessionService } from '../session/session.service';
import { UserService } from '../user/user.service';

export type VerifyPayload = {
    password: string;
    hash: string;
    salt: Buffer;
};

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        @Inject(forwardRef(() => CookieService))
        private readonly cookieService: CookieService,
        @Inject(forwardRef(() => SessionService))
        private readonly sessionService: SessionService,
        @Inject(forwardRef(() => RefreshTokenService))
        private readonly refreshTokenService: RefreshTokenService
    ) {}

    public static readonly saltLength = 128;
    public static readonly options: Options & { raw: false } = {
        timeCost: 4,
        memoryCost: 2 ** 16,
        parallelism: 2,
        type: argon2id,
        saltLength: AuthService.saltLength,
        raw: false,
    };

    async register(data: Prisma.UserCreateInput, res: Response) {
        const { password } = data;
        const { username } = await this.userService.create(data);
        await this.login(username, password, res);
    }

    async login(
        username: User['username'],
        password: User['password'],
        res: Response,
        cookies?: string
    ): Promise<{
        message: string;
        email?: User['email'];
        name?: User['username'];
    }> {
        const sessionValid = await this.cookieService.checkSessionCookie(
            res,
            cookies
        );
        if (sessionValid) {
            res.status(HttpStatus.OK);
            return { message: 'User already logged in' };
        }
        const refresh = await this.cookieService.checkRefreshTokenCookie(
            res,
            cookies
        );
        if (refresh) {
            res.status(HttpStatus.OK);
            return { message: 'Session expired, but valid refresh token!' };
        }
        const user = await this.userService.findByUsername(username);
        const passwordMatch = await this.verifyPassword({
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

    async hashPassword(password: string): Promise<[string, Buffer]> {
        const key = this.configService.get<string>('SECRET') || '';
        const salt = randomBytes(AuthService.saltLength);
        const secret = createHmac('sha512', key).update(salt).digest();
        const options = { ...AuthService.options, salt, secret };
        try {
            const result = await hash(password, options);
            return [result, salt];
        } catch (e) {
            Logger.error(JSON.stringify(e));
            throw new InternalServerErrorException('Failed hashing password');
        }
    }

    async verifyPassword(payload: VerifyPayload): Promise<boolean> {
        const { salt, hash, password } = payload;
        if (!hash) {
            return false;
        }
        const key = this.configService.get<string>('SECRET') || '';
        const secret = createHmac('sha512', key).update(salt).digest();
        const options = { ...AuthService.options, salt, secret };
        try {
            const result = await verify(hash, password, options);
            return result;
        } catch (e) {
            Logger.error(JSON.stringify(e));
            throw new InternalServerErrorException('Failed verifying password');
        }
    }
}
