import {
    Body,
    Controller,
    Get,
    NotImplementedException,
    Post,
    Res,
} from '@nestjs/common';
import { Auth, LoginSchema } from '@types';
import { Response } from 'express';
import { SignedCookies } from '../../decorator/cookies.decorator';
import { SessionService } from '../session/session.service';
import { UserPipe } from '../user/user.pipe';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPipe } from './login.pipe';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly sessionService: SessionService
    ) {}

    @Post('register')
    async register(
        @SignedCookies() cookies: string,
        @Body(new UserPipe())
        data: Parameters<typeof UserService.prototype.create>[0],
        @Res({ passthrough: true }) res: Response
    ): Promise<Auth> {
        return await this.authService.register(data, res, cookies);
    }

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

    @Get('session')
    async getUserSessions() {
        // TODO: get JWT from request header, verify jwt, get sessions
        return new NotImplementedException();
    }
}
