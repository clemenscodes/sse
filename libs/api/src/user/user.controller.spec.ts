import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient, User } from '@prisma/api';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let controller: UserController;
    let userService: DeepMockProxy<UserService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService, PrismaService],
        })
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .overrideProvider(UserService)
            .useValue(mockDeep<UserService>())
            .compile();

        controller = module.get<UserController>(UserController);
        userService = module.get(UserService);
    });

    it('should return users from service', async () => {
        const testUsers: User[] = [];
        jest.spyOn(userService, 'findAll').mockResolvedValue(testUsers);
        const users = await controller.findAll();
        expect(users).toBe(testUsers);
    });
});
