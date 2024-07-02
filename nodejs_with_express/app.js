const express=require('express');
let app=express();
const morgan=require('morgan');
const movierouter=require('./routes/movieRouter');
const customerror=require('./utils/customerror');
const globalhandler=require('./Controllers/errorController');
const authrouter=require('./routes/authrouter');
app.use(express.json());
app.use(morgan('combined'));
app.use(express.static('./public'));// rendering html file
app.use('/movies',movierouter);
app.use('/userdata', authrouter);
app.all('*',(req, res, next)=>{
    const err=new customerror(`cant find ${req.originalUrl} in the server`, 404);
    // err.statusCode=404
    // err.status='fail'
    console.log(err);
    next(err);
})
app.use(globalhandler);
module.exports=app;
