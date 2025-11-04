const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (email, subject, text) => {
    try {
        console.log("Sending email to:", email);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
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
