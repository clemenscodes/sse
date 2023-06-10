import * as uuid from 'uuid';
import { generateSessionToken } from './generateSessionToken';

jest.mock('uuid', () => ({
    v4: jest.requireActual('uuid').v4,
}));

describe('generateSessionToken', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should call uuidv4', () => {
        const mockV4 = jest.spyOn(uuid, 'v4');
        const token = generateSessionToken();
        console.log(token);
        expect(mockV4).toHaveBeenCalled();
    });

    test('should return the generated session token', () => {
        const expectedToken = 'generated-token';
        jest.spyOn(uuid, 'v4').mockReturnValue(expectedToken);
        const sessionToken = generateSessionToken();
        expect(sessionToken).toBe(expectedToken);
    });

    test('should return a UUID without throwing errors', () => {
        const sessionToken = generateSessionToken();
        expect(sessionToken).toMatch(
            /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}/i
        );
    });
});
