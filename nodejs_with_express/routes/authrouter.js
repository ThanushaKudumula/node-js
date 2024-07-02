const express=require('express');
const usercontroller=require('../Controllers/authController')
const router=express.Router();


router.route('/signup')
.post(usercontroller.signup);

// router.route('/login').
// post(usercontroller.login)



