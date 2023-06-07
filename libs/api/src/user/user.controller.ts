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
import { User } from '@prisma/api';
import { UserPipe } from './user.pipe';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body(new UserPipe()) user: User) {
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
    update(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        id: string,
        @Body(new UserPipe()) user: User
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
