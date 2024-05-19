const express=require('express');
const { registerUser, loginUser, forgotPassword, getUserProfile, getMyBlogs, resetPassword, updateProfile } = require('../Controllers/authenticationController');
const { logoutUser } = require('../Controllers/algorithmController');
const multer =require('multer');
const path=require('path')
const upload=multer({storage:multer.diskStorage({
    destination:function(req,file,callback)
    {
        callback(null,path.join(__dirname,'..','uploads/users'));
    },
    filename:function(req,file,callback)
    {
        callback(null,file.originalname)
    }
})})
const {isAuthenticatedUser}=require('../Middlewares/authenticate')
const router=express.Router();

router.route('/register').post(upload.single('avatar'),registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/userprofile').get(isAuthenticatedUser,getUserProfile);
router.route('/myposts').get(isAuthenticatedUser,getMyBlogs);
router.route('/pass/reset/:token').post(resetPassword);
router.route('/updateprofile').put(isAuthenticatedUser,upload.single('avatar'),updateProfile);
module.exports=router;