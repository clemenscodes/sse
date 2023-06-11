import { fromTimestamp } from './fromTimestamp';

describe('fromTimestamp', () => {
    test('should return a Date object representing the future expiry date', () => {
        const expirationTimestamp = 1689077940;
        const expirationDate = fromTimestamp(expirationTimestamp);
        const issuedAtTimestamp = 1686485940;
        const issuedAtDate = fromTimestamp(issuedAtTimestamp);
        expect(issuedAtDate).toEqual('11_06_23_14_19_00');
        expect(expirationDate).toEqual('11_07_23_14_19_00');
    });
});
