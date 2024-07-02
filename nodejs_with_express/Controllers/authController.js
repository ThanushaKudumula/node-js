const usermodel=require('./../models/usermodel');
const asyncerrorhandler=require('./../utils/asyncerrorhandler')
exports.signup= async(req, res, next)=>{
    try{
    const newuser= await usermodel.create(req.body);
    res.status(201).json({
        status:'success',
        data:{
            user:newuser
        }
    })
    }
   catch(err){
    res.status(401).json({
        status:'success',
        err:err.message
    })
   } 

}