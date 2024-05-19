const express=require('express');
const {isAuthenticatedUser}=require('../Middlewares/authenticate')
const {createInitiative,getSinglePosts,updatePosts,getMyInitiative,categorizedInitiatives}=require('../Controllers/initiativeController')
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

router.route('/initiative/new').post(isAuthenticatedUser,upload.single('coverpage'),createInitiative);
router.route('/initiative/:id').get(getSinglePosts);
router.route('/initiative/join/:id').post(isAuthenticatedUser,updatePosts)
router.route('/initiative_myposts/').get(isAuthenticatedUser,getMyInitiative)
router.route('/initiative_category/:category').get(categorizedInitiatives);
module.exports=router;