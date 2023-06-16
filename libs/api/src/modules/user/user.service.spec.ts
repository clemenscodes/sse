import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/api';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { HashService } from '../hash/hash.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;
    let hashService: DeepMockProxy<HashService>;
    let prisma: DeepMockProxy<PrismaClient>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, HashService, PrismaService],
        })
            .overrideProvider(HashService)
            .useValue(mockDeep<HashService>())
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .compile();

        service = module.get<UserService>(UserService);
        hashService = module.get(HashService);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(hashService).toBeDefined();
        expect(prisma).toBeDefined();
    });
});
