import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/api';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

describe('NoteController', () => {
    let controller: NoteController;
    let noteService: NoteService;
    let prisma: DeepMockProxy<PrismaClient>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [NoteController],
            providers: [NoteService, PrismaService],
        })
            .overrideProvider(NoteService)
            .useValue(mockDeep<NoteService>())
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaService>())
            .compile();

        controller = module.get<NoteController>(NoteController);
        noteService = module.get(NoteService);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(noteService).toBeDefined();
        expect(prisma).toBeDefined();
    });
});
