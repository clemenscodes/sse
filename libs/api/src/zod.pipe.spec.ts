import { loginSchema } from '@types';
import { ZodPipe } from './zod.pipe';

describe('ZodPipe', () => {
    it('should be defined', () => {
        expect(new ZodPipe(loginSchema)).toBeDefined();
    });
});
