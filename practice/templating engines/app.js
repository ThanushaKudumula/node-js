const express=require('express');
const app= express();
const router=require('./routes/homeroutes');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/temp-engine', router);
app.listen(1000,()=>{
    console.log('server has started');
});