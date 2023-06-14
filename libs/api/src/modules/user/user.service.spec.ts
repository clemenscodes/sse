import {
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient, User } from '@prisma/api';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { AuthService } from '../auth/auth.service';
import { CookieService } from '../cookie/cookie.service';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { SessionService } from '../session/session.service';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;
    let sessionService: SessionService;
    let refreshTokenService: RefreshTokenService;
    let cookieService: CookieService;
    let prisma: DeepMockProxy<PrismaClient>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                PrismaService,
                AuthService,
                SessionService,
                RefreshTokenService,
                CookieService,
            ],
        })
            .overrideProvider(AuthService)
            .useValue(mockDeep<AuthService>())
            .overrideProvider(SessionService)
            .useValue(mockDeep<SessionService>())
            .overrideProvider(RefreshTokenService)
            .useValue(mockDeep<RefreshTokenService>())
            .overrideProvider(CookieService)
            .useValue(mockDeep<CookieService>())
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .compile();

        service = module.get<UserService>(UserService);
        sessionService = module.get(SessionService);
        refreshTokenService = module.get(RefreshTokenService);
        cookieService = module.get(CookieService);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(sessionService).toBeDefined();
        expect(refreshTokenService).toBeDefined();
        expect(cookieService).toBeDefined();
        expect(prisma).toBeDefined();
    });

    describe('findAll', () => {
        it('should return all users', async () => {
            const testUsers: User[] = [
                {
                    id: 1,
                    email: 'user1@example.com',
                    emailVerified: new Date(),
                    salt: Buffer.from('test'),
                    username: 'user1',
                    password: 'password1',
                },
                {
                    id: 2,
                    email: 'user2@example.com',
                    emailVerified: new Date(),
                    salt: Buffer.from('test'),
                    username: 'user2',
                    password: 'password2',
                },
            ];
            prisma.user.findMany.mockResolvedValueOnce(testUsers);

            const result = await service.findAll();

            expect(result).toEqual(testUsers);
            expect(prisma.user.findMany).toHaveBeenCalled();
        });

        it('should throw NotFoundException if no users found', async () => {
            prisma.user.findMany.mockResolvedValueOnce([]);

            await expect(service.findAll()).rejects.toThrowError(
                NotFoundException
            );
            expect(prisma.user.findMany).toHaveBeenCalled();
        });

        it('should throw InternalServerErrorException on other errors', async () => {
            const error = new Error('Some error');
            prisma.user.findMany.mockRejectedValueOnce(error);

            await expect(service.findAll()).rejects.toThrowError(
                InternalServerErrorException
            );
            expect(prisma.user.findMany).toHaveBeenCalled();
        });
    });
});
