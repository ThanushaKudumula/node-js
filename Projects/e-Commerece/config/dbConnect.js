const {mongoose}=require('mongoose');
const dbconnect=async ()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGODB_URL);
        console.log('db has connected successfully');
    }
    catch(err){
        console.log(err.message);
    }
}
module.exports=dbconnect;