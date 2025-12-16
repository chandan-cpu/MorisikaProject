const sendEmail = require('../config/sendEmail');
const { findOne } = require('../models/user.Model.Js');
const User = require('../models/user.Model.Js');
const crypto = require('crypto');
let storeResetOTP = {};
let verifiedEmails = {};

const sendOTP = async (req, res) => {

    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        // console.log('User found for OTP:', user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        user.otp = otp
        user.otpExpire = Date.now() + 5 * 60 * 1000; // 5 minutes
        await user.save();

        await sendEmail(user.email, 'Your OTP Code', `Your OTP is ${otp} please verify within 5 minutes. If you did not request this, please ignore this email. If you face any issues, contact support. Phone Number: +91 7099414274`);
        res.status(200).json({
            message: 'OTP sent successfully to your email',
            user: user.email
        });


    } catch (error) {
        return res.status(500).json({ msg: 'Server Error: ' + error.message });


    }
}



const resetOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        const otp = Math.floor(100000 + Math.random() * 900000);
        const sessionToken = crypto.randomBytes(16).toString('hex');
        storeResetOTP[sessionToken] = {
            email: email,
            otp: otp,
            createdAt: Date.now()
        };

        await sendEmail(email, 'Password Reset OTP', `Your password reset OTP is ${otp}. Valid for 5 minutes. If you did not request this, please ignore this email.`);

        // Store token in HTTP-only cookie (user can't see or modify it)
        res.cookie('resetSessionToken', sessionToken, {
            httpOnly: true,
            secure: false, // true in production with HTTPS
            maxAge: 10 * 60 * 1000, // 10 minutes
            sameSite: 'strict'
        });

       res.status(200).json({
           msg: 'OTP sent to your email for password reset'
           // No sessionToken in response - it's in cookie!
       });

    } catch (error) {
        return res.status(500).json({ msg: 'Server Error: ' + error.message });
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log('Verifying OTP for email:', email);

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.otp !== otp || user.otpExpire < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpire = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const resetVerifyOTP = async (req, res) => {
    try {
        const { resetOtp } = req.body;
        const sessionToken = req.cookies.resetSessionToken;
        
        if (!sessionToken) {
            return res.status(400).json({ msg: "No active reset session. Please request a new OTP." });
        }
        
        const sessionData = storeResetOTP[sessionToken];
        
        if (!sessionData) {
            return res.status(400).json({ msg: "Invalid or expired session" });
        }
        
        const { email, otp } = sessionData;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (otp != resetOtp) {
            return res.status(400).json({ msg: "Invalid OTP" });
        }
        
        verifiedEmails[sessionToken] = email; // Store email by session token
        delete storeResetOTP[sessionToken];
        
        res.status(200).json({ 
            msg: "OTP Verified Successfully"
            // Cookie is still active for next step
        });

    } catch (error) {
        res.status(500).json({ msg: "Server Error: " + error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const sessionToken = req.cookies.resetSessionToken;
        
        if (!sessionToken) {
            return res.status(403).json({ msg: "No active reset session" });
        }

        const email = verifiedEmails[sessionToken];
        
        if (!email) {
            return res.status(403).json({ msg: "OTP not verified or session expired" });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        
        user.password = newPassword;
        await user.save();
        delete verifiedEmails[sessionToken];
        
        // Clear the cookie
        res.clearCookie('resetSessionToken');
        
        res.status(200).json({ msg: "Password reset successfully" });
   
    } catch (error) {
        res.status(500).json({ msg: "Server Error: " + error.message });
    }
};

module.exports = { sendOTP, verifyOTP, resetOTP, resetVerifyOTP, resetPassword }