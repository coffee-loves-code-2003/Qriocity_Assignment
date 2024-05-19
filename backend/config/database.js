const mongoose= require('mongoose');
const connectDB=()=>
{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(connection=>
        {
            console.log(`MongoDB is connected successfully to the host ${connection.connection.host}`)
        })
}

module.exports=connectDB;