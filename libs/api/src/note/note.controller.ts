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
    Query,
} from '@nestjs/common';
import { Note } from '@prisma/api';
import { NotePipe } from './note.pipe';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Post()
    create(@Body(new NotePipe()) note: Note) {
        return this.noteService.create(note);
    }

    @Get()
    findAll() {
        return this.noteService.findAll();
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
    findOne(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        id: string
    ) {
        return this.noteService.findOne(+id);
    }

    @Get('user/:userId')
    findAllByUserId(
        @Param(
            'userId',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        userId: string
    ) {
        return this.noteService.findAllByUserId(+userId);
    }

    @Patch(':id')
    update(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        id: string,

        @Body(new NotePipe()) note: Note
    ) {
        return this.noteService.update(+id, note);
    }

    @Delete(':id')
    remove(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        id: string
    ) {
        return this.noteService.remove(+id);
    }
}
