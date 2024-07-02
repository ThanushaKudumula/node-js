const mongoose=require('mongoose');
const validate=require('validator');
const schema= new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'please enter your name']
    },
    email:{
        type:String,
        required:[true, 'enter your email'],
        unique:true,
        lowercase:true,
        validate: [validate.isEmail, 'please enter a valid email']
    },
    photo:String,
    password:{
        type:String,
        minLength: 8,
        maxLength:15,
        required:[true, 'please enter your password'],
        select:false
    },
    confirmpassword:{
        type:String,
        required:[true, 'please confirm your paswword'],
        validate:{
           validator:function(val){
                return val==this.password
           }, 
           message:"password doesnt match"
        }
    },
    // passwordresettoken:String,
    // passwordresettokenexpires:Date
})
const model =mongoose.model('users', schema);
module.exports=model;