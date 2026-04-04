const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (email, subject, text) => {
    try {
        console.log("Sending email to:", email);
        const transporter = nodemailer.createTransport({
           host: "smtp-relay.brevo.com",
            port: 465,
            secure: true, // VERY IMPORTANT
            auth: {
                user: process.env.EMAIL_USER || 'chandanboruah288@gmail.com',
                pass: process.env.EMAIL_PASS || 'fdol uqfy rmjf gwvd',
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        });

        console.log('✅ Email sent successfully');
    } catch (error) {
        console.error('❌ Email not sent:', error.message);
        throw new Error('Email not sent');
    }
};

module.exports = sendEmail;
