const ErrorHandler=require('../utils/errorHandler');
const catchAsyncError=require('../Middlewares/catchAsyncError');
const initiativeModel=require('../Models/initiativeModel')
//Get Posts
const APIFeatures=require('../utils/apiFeatures')
exports.getInitiatives=async(req,res,next)=>
{
    const getInitiativesByKeyword=new APIFeatures(initiativeModel.find(),req.query).search().filterbyCategory()
    const initiatives=await getInitiativesByKeyword.query;
    res.status(200).json({
        success:true,
        initiatives
    })

}

exports.createInitiative = catchAsyncError(async (req, res, next) => {
    let author = req.user._id;
    const{name,descriptions,category}=req.body
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
    const posts = await initiativeModel.create(
        {
        coverpage,name,descriptions,category,author
});

    // Respond with the created posts
    res.status(201).json({
        success: true,
        posts
    });
});


//Get Single Blog

exports.getSinglePosts=async(req,res,next)=>
{
    console.log('FROM CLEIANNSF')
    const SinglePosts=await initiativeModel.findById(req.params.id);
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
exports.updatePosts=async(req,res,next)=>
    {
        let verifyPostsExist=await initiativeModel.findById(req.params.id);
        if(!verifyPostsExist)
        {
            return res.status(404).json(
                {
                    success:false,
                    message:"Could not find the blog"
                }
            );
        }
        let user_id=req.user._id;
        const isMember = verifyPostsExist.joined_members.some(member => member.User_id.toString() === user_id.toString());
        if (isMember) {
            return res.status(400).json({ message: 'User is already a member' });
        }
        verifyPostsExist.joined_members.push({ name:req.user.name, User_id:req.user._id });

        await verifyPostsExist.save();
            res.status(201).json(
                {
                    success:true,
                    verifyPostsExist
                }
            )
           
    
    }

    exports.getMyInitiative=catchAsyncError(async(req,res,next)=>
        {
            
            const SinglePosts=await initiativeModel.find({author:req.user._id});
            if(SinglePosts.length==0)
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
        })

        exports.categorizedInitiatives=catchAsyncError(async(req,res,next)=>
            {
                
                const SinglePosts=await initiativeModel.find({category:req.params.category});
                if(SinglePosts.length==0)
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
            })