const catchAsyncError=require('../Middlewares/catchAsyncError')
const ErrorHandler=require('../utils/errorHandler')
const User=require('../Models/userModel')
const postenvschema=require('../Models/postModel')
const sendToken=require('../utils/jsonwebtoken')
exports.registerUser=catchAsyncError(async(req,res,next)=>
{
    const{name,email,password,role}=req.body
    let avatar;
    let BASE_URL=process.env.BACKEND_URL;
    if(process.env.NODE_ENVIRONMENT==="production")
        {
            BASE_URL=`${req.protocol}://${req.get('host')}`
        }
    if(req.file)
    {
        avatar=`${BASE_URL}/uploads/users/${req.file.originalname}`
    }
    const user=await User.create(
        {
            name,email,password,avatar,role
        }
    );
    //getJwtToken is the schema method which is inside the JSON body
    return sendToken(user,201,res);
})

exports.loginUser=catchAsyncError(async(req,res,next)=>
{
    const{email,password}=req.body;
    if(!email || !password)
    {
        return next(new ErrorHandler("Please enter email or password",400));
    }
    //getting the password only when needed so thats why we are using select
    const user=await User.findOne(
        {
            email
        }
    ).select('+password');
    if(!user)
    {
        return next(new ErrorHandler("Invalid Email or Password",401));

    }
    if(!await user.isValidPassword(password))
    {
        return next(new ErrorHandler("Invalid Email or Password",401));
    }
    return sendToken(user,201,res);


})
exports.forgotPassword=catchAsyncError(async(req,res,next)=>
{
    const user=await User.findOne({email:req.body.email});
    if(!user)
    {
        return next(new ErrorHandler("Invalid Email",401));  
    }
    const resetToken=user.getResetPasswordToken()
    await user.save({validateBeforeSave:false})
    //Since we have defined some validation while updaing any details in DB, modifying just 
    //reset token will give you validation error so we are defined
    //validation before save as false
    

    //Creating the reset url with token
    
    const url=`${req.protocol}://${req.get('host')}/api/v1/pass/reset/${resetToken}`;
    const message=`Password reset url: ${url}\n\n\nIf you have not requested the url, please check your gmail account activity for security purpose.`;
    try
    {
        await sendEmail(
            {
                email:user.email,
                subject:'Password Recovery',
                message

            }
        )
        res.status(200).json({
            success:true,
            message:'Email sent successfully.'
        })
    }
    catch(error)
    {
        //if email does not send successfully just undefine the values in DB
        user.resetPasswordToken=undefined;
        user.resetPasswordTokenExpired=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500))
    }
})

exports.resetPassword=catchAsyncError(async(req,res,next)=>
{
    const resetPasswordToken=req.params.token;
    // to check whether the reset password token expiration date is still greater than the current date and time
    //to verify that token is still valid..Expiration time:30 Minutes
    const user=await User.findOne({resetPasswordToken,
    resetPasswordTokenExpired:
            {
            $gt:Date.now()
            }});
            if(!user)
            {
                return next(new ErrorHandler('Invalid Token or expired Token',401));
            }
            if(user)
            {
                if(req.body.password!=req.body.confirmPassword)
                {
                    return next(new ErrorHandler('Password does not match. Please try again'));
                }

            }
            user.password=req.body.password;
            user.resetPasswordToken=undefined;
            user.resetPasswordTokenExpired=undefined;
            await user.save({validateBeforeSave:false});
            sendToken(user,201,res);

})

//getting user profile
exports.getUserProfile=catchAsyncError(async(req,res,next)=>
{
    const user=await User.findById(req.user.id);
    if(!user)
    {
        return next(new ErrorHandler("Invalid User",401));
    }
    res.status(201).json(
        {
        success:true,
        user
    }
)
})

exports.getMyBlogs=catchAsyncError(async(req,res,next)=>
{
    const blogs=await postenvschema.find({author:req.user._id})
    if(blogs.length==0)
    {
        return res.status(201).json(
            {
                success:false,
                message:'No blogs posted. Feel free to start now.'
            }
        )
    }
    res.status(201).json(
        {
            success:true,
            blogs
        }
    )

})



exports.updateProfile=catchAsyncError(async(req,res,next)=>
{
    let newUser={
        name:req.body.name,
        role:req.body.role
    }
    let avatar;
    let BASE_URL=process.env.BACKEND_URL;
    if(process.env.NODE_ENVIRONMENT==="production")
        {
            BASE_URL=`${req.protocol}://${req.get('host')}`
        }
    if(req.file)
    {
        avatar=`${BASE_URL}/uploads/users/${req.file.originalname}`
        newUser={...newUser,avatar}
    }
    const user=await User.findByIdAndUpdate(req.user.id,newUser,{
        new:true,
        runValidator:true
    })

    res.status(200).json({
        success:true,
        user
    })
})
