const sendToken=(user,statusCode,res)=>
{
    const token=user.getJwtToken();
    const options={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME *24 *60*60*1000),
        //cannot be accessed from client level Javascript files
        httpOnly:true,
    }
    res.status(statusCode).
    cookie('Qriocity_Environment',token,options).json(
        {
            success:true,
            user,
            token
        }
    )
}
module.exports=sendToken;