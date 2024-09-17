

const express=require('express');
const router=express.Router();
const usercontroller=require('./../controllers/usercntrl')
const {authmiddleware, isAdmin}=require('./../middlewares/authmiddleware')
//api endpoints
router.post('/register',usercontroller.createUser );
router.post('/login', usercontroller.loginuser);
router.post('/forgotpasswordtoken', usercontroller.forgotPasswordToken)
router.post('/resetpassord/:token', usercontroller.resetPassword)
router.get('/refresh', usercontroller.handlerefreshtoken)
router.get('/logout', usercontroller.logout)
router.get('/get',usercontroller.getalluser);
router.get('/:id',authmiddleware,isAdmin , usercontroller.getbyId);
router.delete('/:id',usercontroller.deletebyId);
router.put('/edit-user',  authmiddleware, usercontroller.updatebyId);
router.put('/block-user/:id', authmiddleware,isAdmin, usercontroller.block);
router.put('/unblock-user/:id', authmiddleware,isAdmin, usercontroller.unblock);
router.put('/updatepassword', authmiddleware, usercontroller.updatePassword  )
module.exports=router