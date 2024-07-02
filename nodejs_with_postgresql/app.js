
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const productRoutes = require('./routes/product.routes');
app.use('/grocery', productRoutes);
module.exports=app