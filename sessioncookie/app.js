const express =require('express');
const mongoose = require('mongoose');
// const cookieexpress=require('child_process');
const signin=require('./controllers/sigin');

const app=express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/sessioncookie')
.then(()=>{
    console.log('database has connected');
})
.catch((err)=>{
    console.log(err.message);
})
app.use('/signin', signin);
// app.use('/welcome', );
app.listen(2000);
module.exports=app;