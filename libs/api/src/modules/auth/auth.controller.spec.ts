import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/api';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';
import { SessionService } from '../session/session.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;
    let userService: UserService;
    let sessionService: SessionService;
    let prisma: DeepMockProxy<PrismaClient>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                AuthService,
                UserService,
                SessionService,
                PrismaService,
            ],
        })
            .overrideProvider(AuthService)
            .useValue(mockDeep<AuthService>())
            .overrideProvider(UserService)
            .useValue(mockDeep<UserService>())
            .overrideProvider(SessionService)
            .useValue(mockDeep<SessionService>())
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get(AuthService);
        userService = module.get(UserService);
        sessionService = module.get(SessionService);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(authService).toBeDefined();
        expect(userService).toBeDefined();
        expect(sessionService).toBeDefined();
        expect(prisma).toBeDefined();
    });
});
