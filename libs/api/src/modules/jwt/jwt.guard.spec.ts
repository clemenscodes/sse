import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { AuthService } from '../auth/auth.service';
import { JwtGuard } from './jwt.guard';
import { JwtService } from './jwt.service';

describe('JwtGuard', () => {
    let guard: JwtGuard;
    let authService: AuthService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [JwtGuard, AuthService, JwtService],
        })
            .overrideProvider(AuthService)
            .useValue(mockDeep<AuthService>())
            .overrideProvider(JwtService)
            .useValue(mockDeep<JwtService>())
            .compile();

        guard = module.get(JwtGuard);
        authService = module.get(AuthService);
        jwtService = module.get(JwtService);
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
        expect(authService).toBeDefined();
        expect(jwtService).toBeDefined();
    });
});
