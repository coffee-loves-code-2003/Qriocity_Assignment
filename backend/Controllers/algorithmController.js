const ErrorHandler=require('../utils/errorHandler');
const catchAsyncError=require('../Middlewares/catchAsyncError');
const postModel=require('../Models/postModel')
//Get Posts
const APIFeatures=require('../utils/apiFeatures')
exports.getPosts=async(req,res,next)=>
{
    const getPostsByKeyword=new APIFeatures(postModel.find(),req.query).search().filterbyCategory()
    const post=await getPostsByKeyword.query;
    res.status(200).json({
        success:true,
        post
    })

}
//create posts - /posts/new
exports.createPosts = catchAsyncError(async (req, res, next) => {
    let author = req.user._id;
    const{name,descriptions,Long_description}=req.body
    let coverpage;
    let BASE_URL=process.env.BACKEND_URL;
    if(process.env.NODE_ENVIRONMENT==="production")
        {
            BASE_URL=`${req.protocol}://${req.get('host')}`
        }
    if(req.file)
    {
        coverpage=`${BASE_URL}/uploads/coverpage/${req.file.originalname}`
    }
    console.log(coverpage);
    // Create a new posts document without specifying the _id field
    const posts = await postModel.create(
        {
        coverpage,name,descriptions,Long_description,author
});

    // Respond with the created algorithm
    res.status(201).json({
        success: true,
        posts
    });
});


//Get Single Blog

exports.getSinglePosts=async(req,res,next)=>
{

    const SinglePosts=await postModel.findById(req.params.id);
    if(!SinglePosts)
    {
        
        // after creating the object it should return to the error middleware located in the middleware/error.js
        return next(new ErrorHandler("Posts not found",400));
    }
    res.status(201).json(
        {
            sucesss:true,
            SinglePosts
        }
    )
}

//updatePosts

exports.updatePosts=async(req,res,next)=>
{
    let verifyPostsExist=await postModel.findById(req.params.id);
    if(!verifyPostsExist)
    {
        return res.status(404).json(
            {
                success:false,
                message:"Could not find the blog"
            }
        );
    }
     verifyPostsExist=await postModel.findByIdAndUpdate(req.params.id,req.body,
        {
            //to show only the new data
            new:true,
            // to check the required field that we defined in models
            runValidators:true
        })
        res.status(201).json(
            {
                success:true,
                verifyPostsExist
            }
        )

}



//Delete Posts

exports.deletePosts=async(req,res,next)=>
{
    let verifyPostsExist=await postModel.findById(req.params.id);
    if(!verifyPostsExist)
    {
        return res.status(404).json(
            {
                success:false,
                message:"Could not find the blog"
            }
        );
    }
    await postModel.deleteOne({_id:req.params.id}); 
    res.status(200).json
    (
        {
            success:true,
            message:"Blog Post Deleted"
        }
    )
}

exports.logoutUser=(req,res,next)=>
{
    
    res.cookie('Qriocity_Environment',null,
{
    expires:new Date(Date.now()),
    httpOnly:true
}).status(200).json(
    {
        success:true,
        message:"Logged Out Successfully"
    }
)
}

exports.getMyBlogs=async(req,res,next)=>
{
    const SinglePosts=await postModel.find({author:req.user._id});
    if(!SinglePosts)
    {
        
        // after creating the object it should return to the error middleware located in the middleware/error.js
        return next(new ErrorHandler("Posts not found",400));
    }
    res.status(201).json(
        {
            sucesss:true,
            SinglePosts
        }
    )
}