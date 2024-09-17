const jwt=require('jsonwebtoken');
const generaterefreshtoken=(id)=>{
    return jwt.sign({id}, process.env.SECRET_TOKEN, {expiresIn:'3d'})
}
module.exports=generaterefreshtoken;
