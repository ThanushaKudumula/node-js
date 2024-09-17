const {mongoose}=require('mongoose');
const bcrypt=require('bcrypt');
const schema=new mongoose.Schema({
    Firstname:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    Lastname:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user'
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    cart:{
        type:Array,
        default:[]
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address'
    },
    Wishlist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    refreshToken:{
        type:String
    },
    passwordcchnagedAt:Date,
    passwordresettoken:String,
    passwordresetExpires:Date

},
{
timestamps: true
}
)
schema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password= bcrypt.hash(this.password, 10)
})
//matching the password while login
schema.methods.isPasswordMatched=async function(enteredpassword){
    return await bcrypt.compare(enteredpassword, this.password);
}
schema.methods.createpasswordresetoken=async function(){
    const resettoken=crypto.randomBytes(32).toString("hex");
    this.passwordresettoken=crypto.createHash("sha256")
    .update(resettoken)
    .digest("hex");
    this.passwordresetExpires=Date.now() + 30 * 60 * 1000; 
    return resettoken
}
const model=mongoose.model('User', schema);
module.exports=model