import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/api';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let prisma: DeepMockProxy<PrismaClient>;
    let configService: DeepMockProxy<ConfigService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, PrismaService, ConfigService],
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .overrideProvider(ConfigService)
            .useValue(mockDeep<ConfigService>())
            .compile();

        service = module.get<AuthService>(AuthService);
        configService = module.get(ConfigService);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(configService).toBeDefined();
        expect(prisma).toBeDefined();
    });
});
