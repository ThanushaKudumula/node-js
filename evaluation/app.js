const express=require('express');
const {Mongoclient}=require('mongodb');
const app=express();
app.use(express.json());

// const routes=require('./routes');
const client = new Mongoclient();

app.use('/post', routes);

client.connect('mongodb://localhost:27017/mydatabase1')
.then(()=>{
    console.log('database has connected')
})
.catch(err=>{
    console.log(err);
})
app.listen(2000, ()=>{
    console.log('sever has started')
})