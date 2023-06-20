import { checkPassword } from './checkPassword';

describe('checkPassword', () => {
    test('returns the correct password score', async () => {
        const password = 'JohnDoe';
        const inputs = ['John', 'Doe', 'example@example.com'];
        const result = checkPassword(password, inputs);
        const { score } = result;
        expect(score).toBe(0);
    });
});
