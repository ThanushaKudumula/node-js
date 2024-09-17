const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/approutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/', router);

const dbURI = 'mongodb://localhost:27017/todo';
mongoose.connect(dbURI)
    .then(() => app.listen(1000, () => {
        console.log('Server has started on port number 1000');
    }))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send("Welcome to my todo list application");
});
