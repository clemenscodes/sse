import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/api';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { SessionService } from '../session/session.service';
import { CookieService } from './cookie.service';

describe('CookieService', () => {
    let service: CookieService;
    let sessionService: SessionService;
    let refreshTokenService: RefreshTokenService;
    let configService: ConfigService;
    let prisma: DeepMockProxy<PrismaClient>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CookieService,
                SessionService,
                RefreshTokenService,
                ConfigService,
                PrismaService,
            ],
        })
            .overrideProvider(CookieService)
            .useValue(mockDeep<CookieService>())
            .overrideProvider(SessionService)
            .useValue(mockDeep<SessionService>())
            .overrideProvider(RefreshTokenService)
            .useValue(mockDeep<RefreshTokenService>())
            .overrideProvider(ConfigService)
            .useValue(mockDeep<ConfigService>())
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .compile();

        service = module.get<CookieService>(CookieService);
        sessionService = module.get(SessionService);
        refreshTokenService = module.get(RefreshTokenService);
        configService = module.get(ConfigService);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(sessionService).toBeDefined();
        expect(refreshTokenService).toBeDefined();
        expect(configService).toBeDefined();
        expect(prisma).toBeDefined();
    });
});
