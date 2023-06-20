/*
 * @jest-environment node
 */
import { mail } from './nodemailer';

const sendMailMock = jest.fn().mockResolvedValueOnce({ messageId: 0 });
const verifyMock = jest.fn();
jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockImplementation(() => ({
        sendMail: sendMailMock,
        verify: verifyMock,
    })),
}));

describe('mail function', () => {
    it('should send an email successfully', async () => {
        const mailOptions = {
            from: 'sender@example.com',
            to: 'recipient@example.com',
            subject: 'Test Email',
            text: 'This is a test email.',
        };
        const smtpOptions = {
            host: 'smtp.example.com',
            port: 587,
            auth: {
                user: 'username',
                pass: 'password',
            },
        };
        await mail(mailOptions, smtpOptions);
    });
});
