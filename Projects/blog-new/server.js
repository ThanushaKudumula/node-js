const express=require('express');
const mongoose=require('mongoose');
const router=require('./routes/approutes');


const app=express()
app.use(express.urlencoded({extended:false}))
// app.use('/articles', router)
app.set('view engine', 'ejs');
app.get('*', (req, res)=>{
    res.redirect('/home');
})

//server and database connection
app.listen(7000,()=>{
    console.log('server has started');
})
mongoose.connect('mongodb://127.0.0.1/Blog')
.then(()=>{
    console.log('database has connected')
})
.catch((err)=>{
    console.log('occurs error while connecting')
})
