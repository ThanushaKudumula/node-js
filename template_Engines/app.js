const express=require('express');
const path=require('path');
const app=express();

app.set('view engine', 'ejs');
const routes=require('./routes/home')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/portfolio',routes);
const port=2000;
app.listen(port, ()=>{
    console.log('server has started on port no', +port);
});
