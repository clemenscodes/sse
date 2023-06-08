import { Test, TestingModule } from '@nestjs/testing';
import { Note, PrismaClient } from '@prisma/api';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

describe('NoteController', () => {
    let controller: NoteController;
    let noteService: DeepMockProxy<NoteService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [NoteController],
            providers: [NoteService, PrismaService],
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .overrideProvider(NoteService)
            .useValue(mockDeep<NoteService>())
            .compile();

        controller = module.get<NoteController>(NoteController);
        noteService = module.get(NoteService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return notes from service', async () => {
        const testNotes: Note[] = [];
        jest.spyOn(noteService, 'findAll').mockResolvedValue(testNotes);
        const notes = await controller.findAll();
        expect(notes).toBe(testNotes);
    });
});
