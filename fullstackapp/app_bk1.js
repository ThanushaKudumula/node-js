//creating afirst server using express
let exp=require('express');
let app=exp();
let dotenv=require('dotenv');
dotenv.config();
let port=process.env.PORT || 6700;
let fruitrouter=require('./src/controller/fruits');
let dsrouter=require('./src/controller/ds');
app.get('/',(req, res)=>{
    res.send("home");
} );
app.use('/fruits',fruitrouter);
app.use('/ds',dsrouter);
app.listen(port, (err)=>{
    if(err)throw err;
    else{
        console.log("using express");
    }
});