import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { AuthService } from '../auth/auth.service';
import { CookieService } from '../cookie/cookie.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { JwtGuard } from './jwt.guard';
import { JwtService } from './jwt.service';

describe('JwtGuard', () => {
    let guard: JwtGuard;
    let authService: AuthService;
    let jwtService: JwtService;
    let cookieService: CookieService;
    let refreshTokenService: RefreshTokenService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JwtGuard,
                AuthService,
                JwtService,
                CookieService,
                RefreshTokenService,
            ],
        })
            .overrideProvider(AuthService)
            .useValue(mockDeep<AuthService>())
            .overrideProvider(JwtService)
            .useValue(mockDeep<JwtService>())
            .overrideProvider(CookieService)
            .useValue(mockDeep<CookieService>())
            .overrideProvider(RefreshTokenService)
            .useValue(mockDeep<RefreshTokenService>())
            .compile();

        guard = module.get(JwtGuard);
        authService = module.get(AuthService);
        jwtService = module.get(JwtService);
        cookieService = module.get(CookieService);
        refreshTokenService = module.get(RefreshTokenService);
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
        expect(authService).toBeDefined();
        expect(jwtService).toBeDefined();
        expect(cookieService).toBeDefined();
        expect(refreshTokenService).toBeDefined();
    });
});
