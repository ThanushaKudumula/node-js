const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    username:String,
    password:String
})
const model=mongoose.model('collection', schema);
module.exports=model;
