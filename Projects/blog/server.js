const express=require('express');
const router=require('./routes/articles');
const mongoose=require('mongoose');
const article=require('./models/article')
const app=express();

mongoose.connect('mongodb://127.0.0.1/blog')
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}))
app.use('/articles', router);
app.get('/articles', async(req, res)=>{
    const articles=await article.find().sort({
        createdAt:'desc'
    })
    res.render('index', {artic: articles})
})

app.listen(2000, ()=>{
    console.log("server has started");
})