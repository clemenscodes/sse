import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/api';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;
    let userService: DeepMockProxy<UserService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService, UserService, PrismaService],
        })
            .overrideProvider(AuthService)
            .useValue(mockDeep<AuthService>())
            .overrideProvider(UserService)
            .useValue(mockDeep<UserService>())
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .compile();

        controller = module.get(AuthController);
        authService = module.get(AuthService);
        userService = module.get(UserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(authService).toBeDefined();
        expect(userService).toBeDefined();
    });
});
