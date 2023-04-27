import { mail } from '@sse/nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as dotenv from 'dotenv';
dotenv.config();

const name = 'Guenther Schabowski';
const address = 'Schabowski@stasi.de';
const sender = address;
const from = { name, address };
const date = new Date(Date.UTC(1989, 10, 9, 17, 0, 0));
const now = new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });
const uid = process.env.UID;
const to = process.env.RECEIVER;
const subject = `Ups ${uid} ${now}`;
const text = 'Endlich mal Urlaub in Spanien';
const html = 'Entschuldige Egon.';

const emailOptions = { from, sender, date, to, subject, text, html };

const smtpTransportOptions: SMTPTransport.Options = {
    host: process.env.SMTP_HOST,
    port: (process.env.SMTP_PORT || 587) as number,
    secure: (process.env.SMTP_SECURE || false) as boolean,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
};

mail(emailOptions, smtpTransportOptions).catch((err) => console.log(err));
