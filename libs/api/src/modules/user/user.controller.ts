import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/api';
import { SessionService } from '../session/session.service';
import { UserPipe } from './user.pipe';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly sessionService: SessionService
    ) {}

    @Post()
    create(@Body(new UserPipe()) user: Prisma.UserCreateInput) {
        return this.userService.create(user);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get('email/:email')
    findByEmail(@Param('email') email: string) {
        return this.userService.findByEmail(email);
    }

    @Get('username/:username')
    findByUsername(@Param('username') username: string) {
        return this.userService.findByUsername(username);
    }

    @Get(':id')
    findOne(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        id: string
    ) {
        return this.userService.findOne(+id);
    }

    @Get(':id/sessions')
    async getUserSessions(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        id: string
    ) {
        return await this.sessionService.getUserSessions(+id);
    }

    @Patch(':id')
    update(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        id: string,
        @Body(new UserPipe()) user: Prisma.UserUpdateInput
    ) {
        return this.userService.update(+id, user);
    }

    @Delete(':id')
    remove(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        id: string
    ) {
        return this.userService.remove(+id);
    }
}
