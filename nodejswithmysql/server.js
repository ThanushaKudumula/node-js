const express=require('express');
const app=express();
const db=require('./db');

const empcont=require('./controllers/employee_controller');

app.use(express.json());
app.use('/api/employees', empcont);


app.listen(2000, ()=>{console.log('server has connected')})