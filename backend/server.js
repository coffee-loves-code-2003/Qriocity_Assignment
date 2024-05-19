const app=require('./app');
// accessing the environment variables
const dotenv=require('dotenv');
const path=require('path');
const connectDB = require('./config/database');

//to get the absolute path where can be run outside the backend folder
dotenv.config({path:path.join(__dirname,"config/config.env")});
connectDB();
const server=app.listen(process.env.PORT,()=>
{
    console.log(`Server listening to the port ${process.env.PORT} in ${process.env.NODE_ENVIRONMENT}`);
})

process.on('unhandledRejection',(err)=>
{
    console.log(`Error: ${err.message}`);
    console.log(err.name);
    if(err.name=="CaseError")
    {
        new Error(err.message);
    }
    else
    {
    console.log("Shutting Down the server due to unhandled rejection error");
    server.close(()=>
    {
        process.exit(1);
    })
    }
    
})

process.on('uncaughtException',(err)=>
{
    console.log(`Error: ${err.message}`);
    console.log(err.name);
    console.log("Shutting Down the server due to uncaught excpetion error");
    server.close(()=>
    {
        process.exit(1);
    }) 
})