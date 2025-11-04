const sendEmail = require('../config/sendEmail');
const { findOne } = require('../models/user.Model.Js');
const User = require('../models/user.Model.Js');

const sendOTP = async (req,res) => {
    
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
        res.status(200).json({ message: 'OTP sent successfully to your email',
            user: user.email
         });


    } catch (error) {
        return res.status(500).json({ msg: 'Server Error: ' + error.message });


    }
}

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

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


module.exports={sendOTP,verifyOTP}