import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/api';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';
import { SessionService } from '../session/session.service';
import { VerificationTokenService } from './verification-token.service';

describe('VerificationTokenService', () => {
    let service: VerificationTokenService;
    let sessionService: SessionService;
    let prisma: DeepMockProxy<PrismaClient>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VerificationTokenService,
                SessionService,
                PrismaService,
            ],
        })
            .overrideProvider(SessionService)
            .useValue(mockDeep<SessionService>())
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .compile();

        service = module.get<VerificationTokenService>(
            VerificationTokenService
        );

        sessionService = module.get<SessionService>(SessionService);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(sessionService).toBeDefined();
        expect(prisma).toBeDefined();
    });
});
