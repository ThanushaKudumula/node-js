const mongoose=require('mongoose');

const schema=mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String
    },
    markdown:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports=mongoose.model('Article', schema);