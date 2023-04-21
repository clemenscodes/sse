import * as nodemailer from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');

// async..await is not allowed in global scope, must use a wrapper
export async function mail() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        sendmail: true,
        // host: 'smtp.ethereal.email',
        // port: 587,
        // secure: false, // true for 465, false for other ports
        // auth: {
        //     user: testAccount.user, // generated ethereal user
        //     pass: testAccount.pass, // generated ethereal password
        // },
    });

    const from = 'Guenther Schabowski <Schabowski@stasi.de>'; // sender address
    const date = new Date(Date.UTC(1989, 10, 9, 17, 0, 0)); // Note: Months are zero-indexed in JavaScript
    const now = new Date().toLocaleString('de-DE', {
        timeZone: 'Europe/Berlin',
    });
    const uid = 'chrn48';
    const to = 'horn_clemens@t-online.de';
    const subject = `Ups ${uid} ${now}`; // Subject line
    const text = 'Endlich mal Urlaub in Spanien'; // plain text body
    const html = 'Entschuldige Egon.'; // html body


    const mailOptions: Mail.Options = {
        from,
        date,
        to,
        subject,
        text,
        html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log({info})

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
