import { fromDate } from './fromDate';

describe('fromDate', () => {
    test('should return a Date object representing the future expiry date', () => {
        const maxAge = 3600; // 1 hour in seconds
        const actual = fromDate(maxAge);
        const currentDate = new Date();
        const expected = new Date(currentDate.getTime() + maxAge * 1000);
        expect(expected).toEqual(actual);
    });

    test('should handle maxAge of 0 and return the current date', () => {
        const maxAge = 0;
        const actual = fromDate(maxAge);
        const currentDate = new Date();
        expect(actual).toEqual(currentDate);
    });

    test('should handle negative maxAge and return the current date', () => {
        const maxAge = -3600;
        const expiryDate = fromDate(maxAge);
        const currentDate = new Date();
        currentDate.setMilliseconds(0); // Ignore milliseconds for comparison
        const actual = currentDate.toISOString().split('T')[0];
        const expectedDate = new Date(expiryDate);
        expectedDate.setMilliseconds(0);
        const expected = expiryDate.toISOString().split('T')[0];
        expect(expected).toEqual(actual);
    });
});
