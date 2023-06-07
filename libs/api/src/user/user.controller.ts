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
    UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/api';
import { userSchema } from '@types';
import { PasswordGuard } from '../password.guard';
import { ZodPipe } from '../zod.pipe';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UseGuards(PasswordGuard)
    create(@Body(new ZodPipe(userSchema)) user: User) {
        return this.userService.create(user);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
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

    @Patch(':id')
    @UseGuards(PasswordGuard)
    update(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        id: string,
        @Body(new ZodPipe(userSchema)) user: User
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
