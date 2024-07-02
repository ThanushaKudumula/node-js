const express=require('express');
const morgan=require('morgan')
let app=express();
const authrouter=require('./routes/authroutes');
app.use(express.json());

app.use('/usermodel', authrouter);

module.exports=app;