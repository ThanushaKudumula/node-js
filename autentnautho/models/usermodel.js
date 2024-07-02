const mongoose=require('mongoose');
const validate=require('validator');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');
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
    passwordresettoken:String,
    passwordresettokenexpires:Date
})
schema.pre('save', async function(next){
    if(!this.isModified('password'))return next();
    // encrypt the password before saving it
   this.password= await bcrypt.hash(this.password,12);
   this.confirmpassword=undefined;
   next();
});

schema.methods.comparePasswordInDb= async function(pwd,pwdfromDB){
      return await bcrypt.compare(pwd, pwdfromDB);
}

schema.methods.createresetpasswordtoken=function(){
    const retoken=crypto.randomBytes(32).toString('hex');

    this.passwordresettoken=crypto.createHash('sha256').update(retoken).digest('hex');
    this.passwordresettokenexpires=Date.now()+10*60*1000;

    console.log(retoken,this.passwordresettoken);
    return retoken;

}

const model =mongoose.model('usermodel', schema);
module.exports=model;