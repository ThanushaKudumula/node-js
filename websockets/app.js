const express=require('express');
const app=express()
const path=require('path');
const port=6000;
const server=app.listen(port, ()=>{
    console.log("server has started on ", +port);

})

app.use(express.static(path.join(__dirname,'public')));