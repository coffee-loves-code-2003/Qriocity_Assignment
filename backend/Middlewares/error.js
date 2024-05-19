const ErrorHandler=require('../utils/errorHandler')
module.exports=(err,req,res,next)=>
{
    err.statusCode = err.statusCode || 500 //Internal server error
    if(process.env.NODE_ENVIRONMENT=="development")
    {
        console.log("HELLO");
        res.status(err.statusCode).json(
            {
                success:false,
                message:err.message,
                stack:err.stack,
                error:err
            }
        )
    }
    if(process.env.NODE_ENVIRONMENT=="production")
    {
        let message = err.message;
        //get the err.name from the error object
        let error=new Error(message)
        if(err.name=="ValidationError")
        {
          message=Object.values(err.errors).map(value=>value.message);
            error=new ErrorHandler(message,400);
        }
        if(err.name=="CastError")
        {
            message=`Resource not Found: ${err.path}`;
            error=new ErrorHandler(message,400);
        }
        
        res.status(err.statusCode).json(
            {
                success:false,
                message:error.message || 'Internal Server Error - 501'
            }
        )
    }
    
}