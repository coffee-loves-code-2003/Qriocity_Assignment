const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError=require('./catchAsyncError')
const JWT=require('jsonwebtoken')
const User=require('../Models/userModel')
exports.isAuthenticatedUser=catchAsyncError(async(req,res,next)=>
{
    console.log("COMEINGUENUEFN")
    const{Qriocity_Environment}=req.cookies;
    if(!Qriocity_Environment)
    {
        return next(new ErrorHandler('Please Login or Register',401));
    }
    
    //decoding JWT Token
    const decode=JWT.verify(Qriocity_Environment,process.env.JWT_SECRET);
    console.log(decode.id);
    req.user=await User.findById(decode.id);
    console.log(req.user.id);
    next();

})