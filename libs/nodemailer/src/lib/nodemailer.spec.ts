import { nodemailer } from './nodemailer';

describe('nodemailer', () => {
    it('should work', () => {
        expect(nodemailer()).toEqual('nodemailer');
    });
});
