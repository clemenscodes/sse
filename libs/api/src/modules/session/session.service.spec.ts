import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/api';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { SessionService } from './session.service';

describe('SessionService', () => {
    let service: SessionService;
    let authService: DeepMockProxy<AuthService>;
    let prisma: DeepMockProxy<PrismaClient>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SessionService, PrismaService, AuthService],
        })
            .overrideProvider(AuthService)
            .useValue(mockDeep<AuthService>())
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .compile();

        service = module.get<SessionService>(SessionService);
        authService = module.get(SessionService);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(authService).toBeDefined();
        expect(prisma).toBeDefined();
    });
});
