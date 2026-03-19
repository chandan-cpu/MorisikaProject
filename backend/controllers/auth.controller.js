// const mongoose=require('mongoose');
const User=require('../models/user.Model');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const { sendOTP, resetOTP } = require('./otp.controller');

const userRegister=async(req,res)=>{
    const {name,email,password,Phonenumber,role}=req.body;
    try{
        const exist=await User.findOne({email})
        if(exist)
        {
            return res.status(400).json({msg:'User Already Exist'})
        }
        const newUser=new User({
            name,
            email,
            password,
            Phonenumber,
            role,
        });

        await newUser.save();

        await sendOTP(req,res);
    }
    catch(error)
    {
        return res.status(500).json({msg:'Server Error: ' + error.message});
    }
}

const userLogin=async(req,res)=>{
    const {email,password}=req.body;
    console.log("Login attempt for email:", email);

    try{
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({msg:'Invalid Email or Password'})
        }

        // 1. Check password FIRST before doing anything else
        const isMatch = await user.comparePassword(password);
        if(!isMatch)
        {
            return res.status(400).json({msg:'Invalid Email or Password'});
        }

        // 2. Check OTP verification
        if(!user.isVerified){
            return res.status(403).json({
                msg:"OTP not verified",
            })
        }

        // 3. Generate token ONLY after all checks pass
        const token=user.generateToken();

        // 4. Set cookie ONLY after all checks pass
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // true in production
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })

        return res.status(200).json({
            msg:"User Login Successfully",
            token:token,
            user:{
                id:user._id,
                name:user.name,
                role:user.role,
            }
        })
    }
    catch(error){
        return res.status(500).json({msg:'Server Error:'+ error.message});
    }
}
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

const forgetPassword=async(req,res)=>{
    const {email}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(404).json({msg:'User not found'});
        }
        await resetOTP(req,res);

    } catch (error) {
        return res.status(500).json({msg:'Server Error:'+ error.message});
        
    }
}

const logOut=async(req,res)=>{
    res.clearCookie('token');
    return res.status(200).json({msg:'User logged out successfully'});
}



module.exports={userRegister,userLogin,getProfile,forgetPassword,logOut};