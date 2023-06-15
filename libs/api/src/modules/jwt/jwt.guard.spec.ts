import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { AuthService } from '../auth/auth.service';
import { CookieService } from '../cookie/cookie.service';
import { JwtGuard } from './jwt.guard';
import { JwtService } from './jwt.service';

describe('JwtGuard', () => {
    let guard: JwtGuard;
    let authService: AuthService;
    let jwtService: JwtService;
    let cookieService: CookieService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [JwtGuard, AuthService, JwtService, CookieService],
        })
            .overrideProvider(AuthService)
            .useValue(mockDeep<AuthService>())
            .overrideProvider(JwtService)
            .useValue(mockDeep<JwtService>())
            .overrideProvider(CookieService)
            .useValue(mockDeep<CookieService>())
            .compile();

        guard = module.get(JwtGuard);
        authService = module.get(AuthService);
        jwtService = module.get(JwtService);
        cookieService = module.get(CookieService);
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
        expect(authService).toBeDefined();
        expect(jwtService).toBeDefined();
        expect(cookieService).toBeDefined();
    });
});
