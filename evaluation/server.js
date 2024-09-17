const express=require('express');
const app=express();
app.use(express.json());
let data=[{
    name:"user1",
    pwd:'pwd1'
}]
app.get('/get', (req, res)=>{
    res.json({
       userdata:data
});
})
app.post('/post', (req, res)=>{
    const name=req.body.name;
    const pwd=req.body.pwd;
    if(!name){
        return res.json({
            message:"name is not available"});
    }  
})
app.listen(2000, ()=>{
    console.log('sever has started')
})
