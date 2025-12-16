const express=require('express');
const { userRegister, userLogin, getProfile, forgetPassword, logOut } = require('../controllers/auth.controller');
const authMiddleware=require('../middlewares/auth.middlewares');
const { sendOTP, verifyOTP, resetPassword, resetVerifyOTP } = require('../controllers/otp.controller');
const authRoles = require('../middlewares/role.middlewares');

const routes=express.Router();
console.log("Auth routes loaded");

routes.post('/register',userRegister)

routes.post('/login',userLogin)
routes.get('/profile',authMiddleware,getProfile)
routes.post('/send-otp', sendOTP);
routes.post('/verify-otp', verifyOTP);
routes.post('/forget-password', forgetPassword);
routes.post('/validate-otp',resetVerifyOTP);
routes.post('/reset-password',resetPassword);
routes.post('/logout',logOut);
routes.get('/admin/dashboard', authMiddleware, authRoles('admin'), (req, res) => {
  res.send('Welcome Admin!');
});
routes.get('/customer/dashboard',authMiddleware,authRoles('customer'),(req,res)=>{
    res.send('Welcome Customer!');
});
module.exports=routes;