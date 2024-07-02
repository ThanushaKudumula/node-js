const mongoose =require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app=require('./app');

mongoose.connect(process.env.CONN_STR)
.then(()=>{
    console.log("DB connection Successfull");
})
.catch((err)=>{
    console.log("error has been catched");
})

const port = 3000;
app.listen(port, () => {
    console.log("server has started ... " + port);
});
