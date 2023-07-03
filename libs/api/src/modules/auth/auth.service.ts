import {
    ExecutionContext,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { VerificationToken, type User } from '@prisma/api';
import { type UserSession } from '@types';
import type {
    ForgotPasswordSchema,
    LoginSchema,
    ResetPasswordSchema,
    UserSchema,
} from '@utils';
import { Response } from 'express';
import * as nodemailer from 'nodemailer';
import { IS_PUBLIC_KEY } from '../../decorator/public.decorator';
import { CookieService } from '../cookie/cookie.service';
import { HashService } from '../hash/hash.service';
import { JwtService } from '../jwt/jwt.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { SessionService } from '../session/session.service';
import { UserService } from '../user/user.service';
import { VerificationTokenService } from '../verification-token/verification-token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly cookieService: CookieService,
        private readonly sessionService: SessionService,
        private readonly refreshTokenService: RefreshTokenService,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
        private readonly verificationTokenService: VerificationTokenService
    ) {}

    async register(
        data: UserSchema,
        res: Response,
        cookies?: string
    ): Promise<{
        message: string;
        jwt?: string;
        email?: User['email'];
        name?: User['username'];
    }> {
        const { sessionValid, refreshValid, message } =
            await this.cookieService.checkCookies(res, cookies);
        if (sessionValid || refreshValid) {
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
        jwt?: string;
        email?: User['email'];
        name?: User['username'];
    }> {
        const { sessionValid, refreshValid, message } =
            await this.cookieService.checkCookies(res, cookies);
        if (sessionValid || refreshValid) {
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
        const jwt = await this.jwtService.generateToken(id);
        res.status(HttpStatus.OK);
        return { message: 'Successfully logged in!', jwt, email, name };
    }

    async logout(userId: User['id'], cookies: string, res: Response) {
        const deletedSessions = await this.sessionService.deleteAllUserSessions(
            userId
        );
        const token = await this.refreshTokenService.deleteUserRefreshToken(
            userId
        );
        if (!(token && deletedSessions)) {
            throw new InternalServerErrorException(
                'Failed clearing user sessions'
            );
        }
        this.cookieService.clearCookies(cookies, res);
    }

    publicCheck(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()]
        );
        if (isPublic) {
            return true;
        }
        return false;
    }

    async getUserBySession(userId: User['id']): Promise<UserSession> {
        const { id, username } = await this.userService.findByIdCustom(userId, {
            id: true,
            username: true,
        });
        if (!(id && username)) {
            throw new InternalServerErrorException('Failed getting user');
        }
        return { id, username };
    }

    async send_email(payload: ForgotPasswordSchema) {
        const { email } = payload;
        const transporter = nodemailer.createTransport({
            host: 'mailhog',
            port: 1025,
        });
        const user = await this.userService.findByEmail(email);
        const token = await this.verificationTokenService.findByUserId(user.id);
        if (token) {
            await this.verificationTokenService.deleteByToken(token);
        }
        const resetToken = await this.verificationTokenService.createToken(
            user.id
        );
        const resetLink = `http://localhost:4200/reset-password/${resetToken}`;

        // Beispiel-E-Mail senden
        const mailOptions = {
            from: 'support@notes.de',
            to: email,
            subject: 'Passwort zurücksetzen',
            html: `<p>Klicken Sie auf den folgenden Link, um Ihr Passwort zurückzusetzen: <a href="${resetLink}">${resetLink}</a></p>`,
        };

        await transporter.verify();
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log(
                    'E-Mail wurde erfolgreich gesendet:',
                    info.response
                );
            }
        });
    }

    async reset_password(
        token: VerificationToken['token'],
        { password, confirmPassword }: ResetPasswordSchema
    ) {
        const data =
            await this.verificationTokenService.findByVerificationToken(token);
        if (!data) {
            throw new InternalServerErrorException('No data found');
        }
        this.userService.updatePassword(data.userId, {password, confirmPassword});
    }
}
