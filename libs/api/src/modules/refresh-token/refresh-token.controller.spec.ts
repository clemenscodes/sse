import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokenController } from './refresh-token.controller';
import { RefreshTokenService } from './refresh-token.service';

describe('RefreshTokenController', () => {
    let controller: RefreshTokenController;
    let service: RefreshTokenService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RefreshTokenController],
            providers: [RefreshTokenService, PrismaService],
        })
            .overrideProvider(RefreshTokenService)
            .useValue(mockDeep<RefreshTokenService>())
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaService>())
            .compile();

        controller = module.get<RefreshTokenController>(RefreshTokenController);
        service = module.get<RefreshTokenService>(RefreshTokenService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });
});
