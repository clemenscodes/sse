import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/api';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { CookieService } from '../cookie/cookie.service';
import { HashService } from '../hash/hash.service';
import { JwtService } from '../jwt/jwt.service';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { SessionService } from '../session/session.service';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let sessionService: SessionService;
    let refreshTokenService: RefreshTokenService;
    let cookieService: CookieService;
    let configService: ConfigService;
    let userService: UserService;
    let hashService: HashService;
    let jwtService: JwtService;
    let prisma: DeepMockProxy<PrismaClient>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                UserService,
                ConfigService,
                PrismaService,
                CookieService,
                RefreshTokenService,
                SessionService,
                HashService,
                JwtService,
            ],
        })
            .overrideProvider(ConfigService)
            .useValue(mockDeep<ConfigService>())
            .overrideProvider(UserService)
            .useValue(mockDeep<UserService>())
            .overrideProvider(SessionService)
            .useValue(mockDeep<SessionService>())
            .overrideProvider(RefreshTokenService)
            .useValue(mockDeep<RefreshTokenService>())
            .overrideProvider(CookieService)
            .useValue(mockDeep<CookieService>())
            .overrideProvider(HashService)
            .useValue(mockDeep<HashService>())
            .overrideProvider(JwtService)
            .useValue(mockDeep<JwtService>())
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .compile();

        service = module.get<AuthService>(AuthService);
        configService = module.get(ConfigService);
        sessionService = module.get(SessionService);
        refreshTokenService = module.get(RefreshTokenService);
        cookieService = module.get(CookieService);
        userService = module.get(UserService);
        hashService = module.get(HashService);
        jwtService = module.get(JwtService);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(configService).toBeDefined();
        expect(sessionService).toBeDefined();
        expect(refreshTokenService).toBeDefined();
        expect(cookieService).toBeDefined();
        expect(userService).toBeDefined();
        expect(hashService).toBeDefined();
        expect(jwtService).toBeDefined();
        expect(prisma).toBeDefined();
    });
});
