const app=require('./app');
// const {Client}=require('pg');
const port=4000;
app.listen(port, ()=>{
    console.log("server has started on port no." +port);
})