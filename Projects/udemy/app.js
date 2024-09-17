const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Route for adding a product
app.get('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

// Handling POST requests to /product
app.post('/product', (req, res, next) => {
    console.log(req.body.title); // Log the title submitted from the form
    res.redirect('/');
});

// Home route
app.get('/', (req, res, next) => {
    res.send('<h1>Hello from Express</h1>');
});

// Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
