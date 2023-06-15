import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { AuthService } from '../auth/auth.service';
import { UserGuard } from './user.guard';

describe('UserGuard', () => {
    let guard: UserGuard;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserGuard, AuthService],
        })
            .overrideProvider(AuthService)
            .useValue(mockDeep<AuthService>())
            .compile();

        guard = module.get(UserGuard);
        authService = module.get(AuthService);
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
        expect(authService).toBeDefined();
    });
});