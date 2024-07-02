const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app.js');
//console.log(app.get("env'));
// console.log(process.env);
mongoose.connect(process.env.LOCAL_CONN_STR)
    // useNewUrlParser:true
    // useUnifiedTopology:true
    .then(() => {
        console.log("DB Connection Succesful");
    })
    .catch((err) => {
        console.log("error has been catched");
    })

const port = 3000;
app.listen(port, () => {
    console.log("server has started ... " + port);
});




