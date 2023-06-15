import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { AuthService } from '../auth/auth.service';
import { NoteGuard } from './note.guard';

describe('NoteGuard', () => {
    let guard: NoteGuard;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [NoteGuard, AuthService],
        })
            .overrideProvider(AuthService)
            .useValue(mockDeep<AuthService>())
            .compile();

        guard = module.get(NoteGuard);
        authService = module.get(AuthService);
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
        expect(authService).toBeDefined();
    });
});
