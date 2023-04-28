import * as nodemailer from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');
import SMTPTransport = require('nodemailer/lib/smtp-transport');

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
    const info = await transporter.sendMail(mail);
    console.log('Message sent: %s', info.messageId);
}
