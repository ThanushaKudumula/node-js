const express=require('express');
const router=express.Router();

router.get('/home',(req, res)=>{
    let names=['Thanusha', 'divya', 'vimala', 'yaseen', 'yeswanth'];
    res.render('index', {
        names
    })

})
module.exports=router;