import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { HashService } from './hash.service';

describe('HashService', () => {
    let service: HashService;
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HashService, ConfigService],
        })
            .overrideProvider(ConfigService)
            .useValue(mockDeep<ConfigService>())
            .compile();

        service = module.get<HashService>(HashService);
        configService = module.get(ConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(configService).toBeDefined();
    });
});
