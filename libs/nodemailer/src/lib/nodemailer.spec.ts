import { mail } from './nodemailer';

describe('nodemailer', () => {
    it('should work', () => {
        expect(mail({}, {})).toHaveReturned();
    });
});
