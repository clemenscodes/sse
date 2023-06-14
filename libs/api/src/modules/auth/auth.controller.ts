import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Cookies } from '../../decorator/cookies.decorator';
import { UserPipe } from '../user/user.pipe';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPipe } from './login.pipe';

export type LoginPayload = {
    username: Parameters<typeof AuthService.prototype.login>[0];
    password: Parameters<typeof AuthService.prototype.login>[1];
};

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async signUp(
        @Body(new UserPipe())
        data: Parameters<typeof UserService.prototype.create>[0],
        @Res({ passthrough: true }) res: Response
    ) {
        return await this.authService.register(data, res);
    }

    @Post('login')
    async login(
        @Cookies() cookies: string,
        @Body(new LoginPipe()) { username, password }: LoginPayload,
        @Res({ passthrough: true }) res: Response
    ) {
        const { message, ...data } = await this.authService.login(
            username,
            password,
            res,
            cookies
        );
        res.json({ message, data });
    }
}
