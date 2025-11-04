const express=require('express');
const { userRegister, userLogin, getProfile } = require('../controllers/auth.controller');
const authMiddleware=require('../middlewares/auth.middlewares');
const { sendOTP, verifyOTP } = require('../controllers/otp.controller');

const routes=express.Router();

routes.post('/register',userRegister)

routes.post('/login',userLogin)
routes.get('/profile',authMiddleware,getProfile)
routes.post('/send-otp', sendOTP);
routes.post('/verify-otp', verifyOTP);

module.exports=routes;