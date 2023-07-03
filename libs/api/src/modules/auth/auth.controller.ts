import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { User, VerificationToken } from '@prisma/api';
import type { Auth } from '@types';
import {
    ForgotPasswordSchema,
    ResetPasswordSchema,
    type LoginSchema,
} from '@utils';
import { Response } from 'express';
import { SignedCookies } from '../../decorator/cookies.decorator';
import { Public } from '../../decorator/public.decorator';
import { UserId } from '../../decorator/userId.decorator';
import { UserPipe } from '../user/user.pipe';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPipe } from './login.pipe';
import {PasswordResetPipe} from "./password-reset.pipe";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(
        @SignedCookies() cookies: string,
        @Body(new UserPipe())
        data: Parameters<typeof UserService.prototype.create>[0],
        @Res({ passthrough: true }) res: Response
    ): Promise<Auth> {
        return await this.authService.register(data, res, cookies);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(
        @SignedCookies() cookies: string,
        @Body(new LoginPipe()) { username, password }: LoginSchema,
        @Res({ passthrough: true }) res: Response
    ): Promise<Auth> {
        return await this.authService.login(
            {
                username,
                password,
            },
            res,
            cookies
        );
    }

    @Post('logout')
    @HttpCode(HttpStatus.NO_CONTENT)
    async logout(
        @SignedCookies() cookies: string,
        @UserId() userId: User['id'],
        @Res({ passthrough: true }) res: Response
    ) {
        return await this.authService.logout(userId, cookies, res);
    }

    @Public()
    @Post('send-email')
    async send_email(@Body() payload: ForgotPasswordSchema) {
        return await this.authService.send_email(payload);
    }

    @Public()
    @Post('reset-password/:token')
    async passwordReset(
        @Param('token') token: VerificationToken['token'],
        @Body(new PasswordResetPipe()) { password, confirmPassword }: ResetPasswordSchema,
    ) {
        return await this.authService.reset_password(token, {password, confirmPassword});
    }

    @Get('session')
    async getUserBySession(@UserId() userId: User['id']) {
        return await this.authService.getUserBySession(userId);
    }
}
