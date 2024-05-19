const algorithms=require('../Data_Sample/algorithm.json');
const connectDB = require('../config/database');
const algorithm=require('../models/algorithmModel');
const dotenv=require('dotenv');


//since it is not assosiated with the server.js we are again giving the environment varibales
dotenv.config({
    path:'backend/config/config.env'
});
connectDB();
const seedAlgorithms=async()=>
{
    try
    {
        await algorithm.deleteMany();
    console.log("All Algorithms are deleted");
    await algorithm.insertMany(algorithms);
    console.log("All algorithms are added");
    }
    catch(error)
    {
        console.log(error.message);
    }
    
}
seedAlgorithms();