import { Body, Controller, Post } from '@nestjs/common';
import { UserPipe } from '../user/user.pipe';
import { UserService } from '../user/user.service';
import { LoginPipe } from './login.pipe';

export type SignInPayload = {
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
    async login(@Body(new LoginPipe()) { username, password }: SignInPayload) {
        return await this.userService.login(username, password);
    }
}
