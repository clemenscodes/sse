import { JwtService as Service } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { JwtService } from './jwt.service';

describe('JwtService', () => {
    let service: JwtService;
    let jwtService: Service;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [JwtService, Service],
        })
            .overrideProvider(Service)
            .useValue(mockDeep<Service>())
            .compile();

        service = module.get<JwtService>(JwtService);
        jwtService = module.get(Service);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(jwtService).toBeDefined();
    });
});
