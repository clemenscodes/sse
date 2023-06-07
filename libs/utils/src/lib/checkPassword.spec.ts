import { checkPassword } from './checkPassword';

describe('checkPassword', () => {
    test('returns the correct password score', async () => {
        const password = 'MyStrongPassword123';
        const inputs = ['JohnDoe', 'example@example.com'];
        const result = await checkPassword(password, inputs);
        const { score } = result;
        expect(score).toBe(3);
    });
});
