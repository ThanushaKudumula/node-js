let exp=require('express');
let fs=require('fs');
let app=exp();
let dotenv=require('dotenv');
dotenv.config();
let port=process.env.PORT || 6700;
let fruitrouter=require('./src/controller/fruits');
let dsrouter=require('./src/controller/ds');
const morgan = require('morgan');
const { title } = require('process');
// middleware
app.use(morgan('common',
    {stream:fs.createWriteStream('./app.log')}))
//static file path
app.use(exp.static(__dirname + '/public'));
//html file path
app.set('views','./src/views');
//view engine
app.set('view engine', 'ejs');

app.get('/',(req, res)=>{
    res.render('index', {title:'firstpage'})
} );
app.use('/fruits',fruitrouter);
app.use('/ds',dsrouter);
app.listen(port, (err)=>{
    if(err)throw err;
    else{
        console.log("using express");
    }
});
