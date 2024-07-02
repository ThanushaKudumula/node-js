const express = require('express');
const productControllers = require('../controllers/product.controllers');
const router = express.Router();

router.route('/create').post(productControllers.createProduct);

router.route('/select').get(productControllers.getProduct);

router.route('/select/:id')
.get(productControllers.selectbyId)
.patch(productControllers.updatebyId)
.delete(productControllers.deletebyId)

module.exports = router;