const express=require('express');
const { userRegister, userLogin, getProfile, forgetPassword } = require('../controllers/auth.controller');
const authMiddleware=require('../middlewares/auth.middlewares');
const { sendOTP, verifyOTP, resetPassword, resetVerifyOTP } = require('../controllers/otp.controller');

const routes=express.Router();

routes.post('/register',userRegister)

routes.post('/login',userLogin)
routes.get('/profile',authMiddleware,getProfile)
routes.post('/send-otp', sendOTP);
routes.post('/verify-otp', verifyOTP);
routes.post('/forget-password', forgetPassword);
routes.post('/validate-otp',resetVerifyOTP);
routes.post('/reset-password',resetPassword);

module.exports=routes;