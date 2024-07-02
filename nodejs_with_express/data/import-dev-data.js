const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const fs = require('fs');
const movie=require('./../models/moviemodel');
mongoose.connect(process.env.LOCAL_CONN_STR)
    .then(() => {
        console.log("DB Connection Succesful");
    })
    .catch((err) => {
        console.log("error has been catched");
    })
const movies=JSON.parse(fs.readFileSync('./data/sample.json'));
const deletemovies=async ()=>{
    try{
        await movie.deleteMany();
        console.log("data successfully deleted");
    }
    catch(err){
        console.log(err.message);
    }
    process.exit();
}

//import movies data to mongodb collectionw321` fdcwzsa 21`
const importmovies=async()=>{
    try{
        await movie.create(movies);
        console.log("collections added");
    }
    catch(err){
        console.log(err.message);
    }
    process.exit();
}
if(process.argv[2]=='--import')importmovies();
if(process.argv[2]=='--delete')deletemovies();


