import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
    let guard: RolesGuard;
    let authService: AuthService;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RolesGuard, AuthService, UserService],
        })
            .overrideProvider(AuthService)
            .useValue(mockDeep<AuthService>())
            .overrideProvider(UserService)
            .useValue(mockDeep<UserService>())
            .compile();

        guard = module.get(RolesGuard);
        authService = module.get(AuthService);
        userService = module.get(UserService);
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
        expect(authService).toBeDefined();
        expect(userService).toBeDefined();
    });
});
