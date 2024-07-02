let exp=require('express');
let fruitrouter=exp.Router();
const fruits=[
    {
        "fruit": "Apple",
        "size": "Large",
        "color": "Red",
        "rippen": "no"      
    }
];
fruitrouter.route('/')
.get((req, res)=>{
    res.send(fruits);
 });
fruitrouter.route('/details').get((req, res)=>{
    res.send("about fruits in detail");
} );
module.exports=fruitrouter;