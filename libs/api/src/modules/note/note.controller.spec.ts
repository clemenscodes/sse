import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/api';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { NoteController } from './note.controller';
import { NoteGuard } from './note.guard';
import { NoteService } from './note.service';

describe('NoteController', () => {
    let controller: NoteController;
    let noteService: NoteService;
    let authService: AuthService;
    let noteGuard: NoteGuard;
    let prisma: DeepMockProxy<PrismaClient>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [NoteController],
            providers: [NoteService, NoteGuard, AuthService, PrismaService],
        })
            .overrideProvider(NoteService)
            .useValue(mockDeep<NoteService>())
            .overrideProvider(AuthService)
            .useValue(mockDeep<AuthService>())
            .overrideProvider(NoteGuard)
            .useValue(mockDeep<NoteGuard>())
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaService>())
            .compile();

        controller = module.get<NoteController>(NoteController);
        noteService = module.get(NoteService);
        authService = module.get(AuthService);
        noteGuard = module.get(NoteGuard);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(noteService).toBeDefined();
        expect(authService).toBeDefined();
        expect(noteGuard).toBeDefined();
        expect(prisma).toBeDefined();
    });
});
