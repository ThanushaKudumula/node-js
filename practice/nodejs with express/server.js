const express=require('express');
const app=express();
const path=require('path');
// express server
app.listen(2000, ()=>{
    console.log('server has started')
})
//middleware
//serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.get('/express_server', (req, res, next)=>{
    res.send('we can express server which is built on top of http module');
    next();
})
const implementation=(req, res)=>{
   console.log('implemented by using app.listen(port, cb)');
}
app.use(implementation);



//routing 
app.get('/home', (req, res)=>{
    res.send('Welcome to Express Tutorial');
})

