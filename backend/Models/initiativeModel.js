const mongoose=require('mongoose');

const initiativeenvSchema=new mongoose.Schema(
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
      
      
      
      author:
      {
        type:mongoose.Schema.Types.ObjectId
        
      },
      category:
      {
        type:String,
        required:[true,"Please enter the category of the initiative"],
        enum:
        {
            values:
            [
                
                "recycling drives",
                "cleanup events",
                "Green environment",
                "Pollution Free",
                "Waste Management",
                "Save Water"


            ],
            message:"Please select correct category"
        }
      },
      joined_members:
      [
        {
            name:{
                type:String,
                required:true,
            },
            User_id:
            {
                type:mongoose.Schema.Types.ObjectId,
                required:true
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

let initiativeenvschema=mongoose.model('InitiativeEnvironment',initiativeenvSchema)
module.exports=initiativeenvschema;