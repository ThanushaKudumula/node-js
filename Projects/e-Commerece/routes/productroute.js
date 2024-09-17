const express=require('express')
const router=express.Router();
const { createproduct, getaproduct, getproduct, updateproduct, deleteproduct} = require('../controllers/productcntrl');
const { isAdmin , authmiddleware} = require('../middlewares/authmiddleware');

router.post('/add', authmiddleware,isAdmin, createproduct)
router.get('/:id', getaproduct)
router.get('/getall', getproduct)
router.put('/:id', updateproduct)
router.delete('/:id', deleteproduct)
module.exports=router
