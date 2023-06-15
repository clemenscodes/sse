import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { NoteSchema } from '@types';
import { Roles } from '../../decorator/roles.decorator';
import { UserGuard } from '../user/user.guard';
import { NoteGuard } from './note.guard';
import { NotePipe } from './note.pipe';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Post()
    @Roles('USER')
    @UseGuards(NoteGuard)
    create(@Body(new NotePipe()) note: NoteSchema) {
        return this.noteService.create(note);
    }

    @Get('public')
    @Roles('USER')
    findAllPublicNotes() {
        return this.noteService.findAllPublicNotes();
    }

    @Get('public/search')
    @Roles('USER')
    searchPublicNotesByContent(@Query('content') content: string) {
        return this.noteService.searchPublicNotesByContent(content);
    }

    @Get('user/:userId')
    @Roles('USER')
    @UseGuards(UserGuard)
    findAllByUserId(@Param('userId') userId: string) {
        return this.noteService.findAllByUserId(userId);
    }
}
