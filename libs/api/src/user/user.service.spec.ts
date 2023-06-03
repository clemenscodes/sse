import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient, User } from '@prisma/api';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;
    let prisma: DeepMockProxy<PrismaClient>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, PrismaService],
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .compile();

        service = module.get<UserService>(UserService);
        prisma = module.get(PrismaService);
    });

    it('returns users', () => {
        const testUsers: User[] = [];
        prisma.user.findMany.mockResolvedValueOnce(testUsers);
        expect(service.findAll()).resolves.toBe(testUsers);
    });
});
