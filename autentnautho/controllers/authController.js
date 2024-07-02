const model=require('../models/usermodel');
const jwt=require('jsonwebtoken');
const sendemail=require('./../utils/email');
const crypto=require('crypto');
const token=(id)=>{
    return jwt.sign({id},'secretkeyforvimmuateleventhirty',{
    expiresIn:60*60
})
}
exports.signup=async (req, res)=>{
    try{
    const newuser=await model.create(req.body);
    const docwithtoken=token(newuser._id)
    res.status(201).json({
        status: 'success',
            data: {  
                user: newuser,
                docwithtoken,
            }
        });
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}
exports.login=async (req, res)=>{
    try{
        const email=req.body.email;
        const pwd=req.body.password;
        //const {email, pwd}=req.body
        const user=await model.findOne({email}).select('+password')
        if(!email || !pwd ){
           return  res.status(400).json({
                message:"please provide both email and paswword"
            })
        }
        if( !user || !(await user.comparePasswordInDb(pwd, user.password))){
            return res.status(400).json({
                message:"your credentials does not match. please provide correct one"
            })
        }
        const match=token(user._id)
       return  res.status(200).json({
            status:"success",
            match,
            user
        })
    }
    catch(err){
        return res.status(404).json({
            status:'not found',
            message:err.message
        })
    }
}
exports.forgotpassword= async (req, res)=>{
    try{
        const email = await model.findOne({email:req.body.email});
        if(!email){
            return res.status(404).json({
                status:'not found',
                message:err.message
            })
        }
        const resettoken=email.createresetpasswordtoken();
        await email.save({validateBeforeSave:false});

       const reseturl= `${req.protocol}://${req.get('host')}/usermodel/resetpassword/${resettoken}`;

       const msg=`update password\n\n\nlink ${reseturl} is valid for 10 min`;
       try{
            await sendemail({
                email:email.email,
                subject:"update password",
                message:msg
            })
            return res.status(200).json({
                status:'success',
                message:'reset password link sent successfully'
            })
        }
        catch(err){
            email.passwordresettoken=undefined;
            email.passwordresettokenexpires=undefined;
            email.save({validateBeforeSave:false});
            return res.status(500).json(err.message);
        }
    }
    catch(err){
        return res.status(401).json({
            status:'fail',
            message:'reset password link not send'
        }) 
    }
}
exports.passwordreset=async(req, res)=>{
        const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user=await model.findOne({passwordresettoken:req.params.token, passwordresettokenexpires:{$gt:Date.now()}})
        if(!user){
            res.status(400).json("token is invalid or expired");
        }
        user.password=req.body.password;
        user.confirmpassword=req.body.password;
        user.passwordresettoken=undefined;
        user.passwordresettokenexpires=undefined;

        await user.save();
        const logintoken=signToken(model._id);
        res.status(200).json({
            status:'success',
            token:logintoken
        })
}