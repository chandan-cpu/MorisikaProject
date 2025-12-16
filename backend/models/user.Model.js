const mongoose = require('mongoose');

var validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email Format');
            }
        }

    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Password is not Strong Enough');

            }
        }
    },
    Phonenumber: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Invalid Phone Number Format');
            }
        }

    },
    role: {
        type: String,
        enum: ['customer', 'admin', 'seller'],
        default: 'customer',
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: Number,
    otpExpire: Date,
    resetOtp :Number,
    resetOtpExpire:Date,
    isresetOtp:{
        type:Boolean,
        default:false
    }
}, { timestamps: true }
);

userSchema.pre ('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateToken = function () {
    const token = jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    return token;
}


mongoose.model('User', userSchema);
module.exports = mongoose.model('User');
