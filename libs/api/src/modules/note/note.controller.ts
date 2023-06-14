import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { Note } from '@prisma/api';
import { NoteSchema } from '@types';
import { NotePipe } from './note.pipe';
import { NoteService } from './note.service';

// TODO: secure note endpoints, only authorized users can create and view their notes
@Controller('note')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Post()
    create(@Body(new NotePipe()) note: NoteSchema) {
        return this.noteService.create(note);
    }

    @Get('public')
    findAllPublicNotes() {
        return this.noteService.findAllPublicNotes();
    }

    @Get('public/search')
    searchPublicNotesByContent(@Query('content') content: string) {
        return this.noteService.searchPublicNotesByContent(content);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.noteService.findOne(id);
    }

    @Get('user/:userId')
    findAllByUserId(@Param('userId') userId: string) {
        return this.noteService.findAllByUserId(userId);
    }

    @Patch(':id')
    update(@Param('userId') id: string, @Body(new NotePipe()) note: Note) {
        return this.noteService.update(id, note);
    }

    @Delete(':id')
    remove(@Param('userId') id: string) {
        return this.noteService.remove(id);
    }
}
