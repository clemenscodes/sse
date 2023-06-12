import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient, User } from '@prisma/api';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';
import { SessionService } from '../session/session.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let controller: UserController;
    let userService: DeepMockProxy<UserService>;
    let sessionService: DeepMockProxy<SessionService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService, PrismaService, SessionService],
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .overrideProvider(UserService)
            .useValue(mockDeep<UserService>())
            .overrideProvider(SessionService)
            .useValue(mockDeep<SessionService>())
            .compile();

        controller = module.get<UserController>(UserController);
        userService = module.get(UserService);
        sessionService = module.get(SessionService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(userService).toBeDefined();
        expect(sessionService).toBeDefined();
    });

    it('should return users from service', async () => {
        const testUsers: User[] = [];
        jest.spyOn(userService, 'findAll').mockResolvedValue(testUsers);
        const users = await controller.findAll();
        expect(users).toBe(testUsers);
    });
});
