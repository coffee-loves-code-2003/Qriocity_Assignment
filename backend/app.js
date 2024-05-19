const express=require('express');
const app=express();
const path=require('path')
const authentication=require('./Routes/authentication');
const algorithms=require('./Routes/algorithm');
const initiatives=require('./Routes/initiative')
const error = require('./Middlewares/error');
const cookieParser = require('cookie-parser');
//get the response when the response involves JSON file
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/apicalls/algosimplified',algorithms);
app.use('/apicalls/algosimplified',authentication);
app.use('/apicalls/qriocity',initiatives);

if(process.env.NODE_ENVIRONMENT==="production")
    {
        app.use(express.static(path.join(__dirname,'../frontend/build')));
        app.get('*',(req,res)=>
        {
            res.sendFile(path.resolve(__dirname,'../build/index.html'))
        })
    }

app.use(error)
module.exports=app;