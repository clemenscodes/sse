import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { JwtService as Service } from './jwt.service';

describe('JwtService', () => {
    let service: Service;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [Service, JwtService],
        })
            .overrideProvider(JwtService)
            .useValue(mockDeep<JwtService>())
            .compile();

        service = module.get<Service>(Service);
        jwtService = module.get(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(jwtService).toBeDefined();
    });
});
