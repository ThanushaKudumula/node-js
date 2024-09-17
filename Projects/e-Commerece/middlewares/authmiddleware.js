const model = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authmiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.SECRET_TOKEN)  
                const user=await model.findById(decoded.id);
                req.user=user
                console.log(req.user);
                next()
            }
        }
        catch (err) {
            throw new Error(err)
        }
    }
    else {
        throw new Error('no token has attached to the user')
    }
})
const isAdmin=asyncHandler(async(req, res, next)=>{
    // console.log(req.user);
    const {email}=req.user;
    const finduser=await model.findOne({email});
    if(finduser.role!=='admin'){
        throw new Error("you are not an admin")
    }
    else{
        next();
    }

})
module.exports={authmiddleware, isAdmin}