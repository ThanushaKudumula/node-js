const express=require('express');
const bodyparser=require('body-parser');
const dbconnect=require('./config/dbConnect')
const dotenv=require('dotenv').config();
const authroutes=require('./routes/authroutes');
const {notfound, errorhandler}=require('./middlewares/errorhandler');
const cookieParser = require('cookie-parser');
const productroutes=require('./routes/productroute');
const morgan = require('morgan');

const app=express();
//middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded ({extended:false}))
app.use(cookieParser())

dbconnect();
app.use(morgan("dev"))
app.use('/api/user', authroutes);
app.use('/api/product', productroutes);

app.use(notfound);
app.use(errorhandler);

const port=process.env.PORT || 8000
app.listen(port, ()=>{
    console.log("server has started", +port);
})