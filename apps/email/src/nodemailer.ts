import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';

export async function mail(mail: Mail.Options, smtp: SMTPTransport.Options) {
    const transporter = nodemailer.createTransport({
        ...smtp,
        requireTLS: true,
        tls: {
            rejectUnauthorized: false,
            ciphers: 'SSLv3',
        },
        debug: true,
        logger: true,
    });
    await transporter.verify();
    await transporter.sendMail(mail);
}
