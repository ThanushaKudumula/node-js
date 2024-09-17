const express=require('express');
const router=express.Router();
const model=require('./../models/usermodel');

router.post('/signup', async(req, res)=>{
    try{
        const newuser=await model.create(req.body);
        res.status(201).json(newuser);
    }
    catch(err){
        res.status(404).json(err.message);
    }
})
router.
module.exports=router;
