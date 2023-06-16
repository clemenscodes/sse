import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { User } from '@prisma/api';
import { NoteSchema } from '@types';
import { Roles } from '../../decorator/roles.decorator';
import { UserId } from '../../decorator/userId.decorator';
import { NotePipe } from './note.pipe';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Post()
    @Roles('USER')
    create(
        @UserId() userId: User['id'],
        @Body(new NotePipe()) note: NoteSchema
    ) {
        return this.noteService.create(note, userId);
    }

    @Get('search')
    @Roles('USER')
    searchPublicNotesByContent(@Query('content') content: string) {
        return this.noteService.searchPublicNotesByContent(content);
    }

    @Get('user')
    @Roles('USER')
    findAllByUserId(@UserId() userId: User['id']) {
        return this.noteService.findAllByUserId(userId);
    }
}
