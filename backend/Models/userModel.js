const mongoose=require('mongoose');
const validator=require('validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const crypto=require('crypto')
const userSchema=new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:[true,'Please enter your name']
        },
        
        email:
        {
            type:String,
            required:[true,'Please enter your email'],
            unique:true,
            validate:[validator.isEmail,'Please enter validate Email address']
        },
        password:
        {
            type:String,
            required:[true,'Please enter your password'],
            select:false
        },
        avatar:
        {
            type:String
        },
        role:
        {
            type:String,
            required:[true,"Please enter your role"]
        },
        resetPasswordToken:
        {
            type:String
        },
        resetPasswordTokenExpired:
        {
            type:Date
        },
        createdAt:
        {
            type:Date,
            default:Date.now
        }

    }
)
userSchema.pre('save',async function(next)
{
    if(!this.isModified('password'))
    {
        return next();
    }
    try
    {
        this.password=await bcrypt.hash(this.password,10);
        next();
    }
    catch(error)
    {
        return next(error);
    }
})
userSchema.methods.getJwtToken=function()
{
    return jwt.sign(
        {
            id:this.id
        },
        process.env.JWT_SECRET,
        {
           expiresIn:process.env.JWT_EXPIRES_TIME
        }
    )
}
userSchema.methods.getResetPasswordToken=function()
{
    //creating the token for reset password
    const token=crypto.randomBytes(20).toString('hex');
    //Hashing the token for security purpose
    this.resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex')

    //setting the token expires time
    //Token will get expired after 30 mins
    this.resetPasswordTokenExpired=Date.now()+30*60*1000;
    console.log(this.resetPasswordTokenExpired);
    console.log(this.resetPasswordToken);
    return token
}
userSchema.methods.isValidPassword=async function(gotpassword)
{
    let status=await bcrypt.compare(gotpassword,this.password);
    return status;
}
let model=mongoose.model('User',userSchema)
module.exports=model;