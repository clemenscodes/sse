import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/api';
import { mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

describe('SessionController', () => {
    let controller: SessionController;
    let service: SessionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SessionController],
            providers: [SessionService, PrismaService],
        })
            .overrideProvider(SessionService)
            .useValue(mockDeep<SessionService>())
            .overrideProvider(PrismaService)
            .useValue(mockDeep<PrismaClient>())
            .compile();

        controller = module.get<SessionController>(SessionController);
        service = module.get<SessionService>(SessionService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });
});
