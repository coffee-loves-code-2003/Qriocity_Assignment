const express=require('express');
const { getPosts, createPosts, getSinglePosts, getMyBlogs,updatePosts, deletePosts } = require('../Controllers/algorithmController');
const {isAuthenticatedUser}=require('../Middlewares/authenticate')
const router=express.Router();
const multer =require('multer');
const path=require('path')
const upload=multer({storage:multer.diskStorage({
    destination:function(req,file,callback)
    {
        callback(null,path.join(__dirname,'..','uploads/coverpage'));
    },
    filename:function(req,file,callback)
    {
        callback(null,file.originalname)
    }
})})
router.route('/algorithms').get(getPosts);
router.route('/algorithms/new').post(isAuthenticatedUser,upload.single('coverpage'),createPosts);
router.route('/algorithms/:id').get(getSinglePosts).put(isAuthenticatedUser,updatePosts).delete(isAuthenticatedUser,deletePosts);
router.route('/algorithms_myposts').get(isAuthenticatedUser,getMyBlogs)

module.exports=router;