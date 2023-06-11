import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/api';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let prisma: DeepMockProxy<PrismaClient>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, PrismaService],
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .compile();

        service = module.get<AuthService>(AuthService);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(prisma).toBeDefined();
    });

    describe('hashPassword', () => {
        it('should hash the password', async () => {
            const password = 'password';
            const result = await service.hashPassword(password);
            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('verifyPassword', () => {
        it('should verify the correct password', async () => {
            const password = 'password';
            const hashedPassword = await service.hashPassword(password);
            const result = await service.verifyPassword(
                hashedPassword,
                password
            );
            expect(result).toBe(true);
        });

        it('should not verify the incorrect password', async () => {
            const password = 'password';
            const incorrectPassword = 'incorrectPassword';
            const hashedPassword = await service.hashPassword(password);
            const result = await service.verifyPassword(
                hashedPassword,
                incorrectPassword
            );
            expect(result).toBe(false);
        });
    });
});
