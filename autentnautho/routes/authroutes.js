const express=require('express');
const authController=require('../controllers/authController');
const router=express.Router();
router.route('/signup')
.post(authController.signup);

router.route('/login')
.post(authController.login)

router.route('/forgotpassword')
.post(authController.forgotpassword)

router.route('/resetpassword/:token')
.patch(authController.passwordreset)

module.exports = router;


