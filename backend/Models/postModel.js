const mongoose=require('mongoose');

const postenvSchema=new mongoose.Schema(
    {
      coverpage:
        {
            type:String
        },
      name:
      {
        type:String,
        required:[true,"Please enter the title"],
        trim:true,
        maxlength:[100, "Please give the title cannot exceeds the 100 characters"]

      },
      descriptions:
      {
        
         
            type:String,
        required:[true,"Please give us some description"]
          
        
        

      },
      Long_description:
      {
        
         
          type:String,
      required:[true,"Please give us some description"]
        
      
      },
      ratings:
      {
        type:String,
        default:0
      },
      
      
      author:
      {
        type:mongoose.Schema.Types.ObjectId
        
      },
      numOfReviews:
      {
        type:Number,
        default:0
      },
      reviews:
      [
        {
            name:{
                type:String,
                required:true,
            },
            rating:
            {
                type:String,
                required:true
            },
            comments:
            {
                type:String,
                required:true,
                maxlength:[300,"Comments exceeds more than 300 characters"]
            }
        }
      ],
      createdAt:
      {
        type:Date,
        default:Date.now()
      }  
    }
)

let postenvschema=mongoose.model('PostEnvironment',postenvSchema)
module.exports=postenvschema;