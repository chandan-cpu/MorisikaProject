// const mongoose=require('mongoose');
const User=require('../models/user.Model.Js');
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

        const token=newUser.generateToken();
     
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
    console.log("Login attempt for email:", email,"Password:", password);

    try{
        console.log("Searching for user with email:", email);
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({msg:'Invalid Email or Password'})
        }
        const isVerified=user.isVerified;

        const isMatch = await user.comparePassword(password);

        const token=user.generateToken();
        console.log("Generated Token:", token);

        if(!isMatch)
        {
            return res.status(400).json({msg:'Invalid Email or Password'});
        }
        res.cookie('token', token, {
            httpOnly: true,
         
              secure: false, // true in production
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
        const otpSend=user.isVerified;
        if(!otpSend){
            return res.status(403).json({
                msg:"OTP not verified",
            })
        }

        return res.status(200).json({
            msg:"User Login Succesfully",
            token:token,
            user:{
                id:user._id,
                name:user.name,}
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