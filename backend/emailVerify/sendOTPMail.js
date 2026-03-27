import nodemailer from "nodemailer";
import 'dotenv/config';

export const sendOTPMail = (otp, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailConfigurations = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Password Reset OTP',
        html: `<p>Your OTP for password reset is: <strong>${otp}</strong></p>`
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) {
            console.error('Error sending OTP mail:', error);
        } else {
            console.log('OTP Sent Successfully');
            console.log(info);
        }
    });
};



