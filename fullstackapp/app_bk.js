let exp=require('express');
let app=exp();
let dotenv=require('dotenv');
dotenv.config();
let port=process.env.PORT || 6700;
let fruitrouter=exp.Router();
// let dsrouter=exp.Router();
//default route
const fruits=[
    {
        "fruit": "Apple",
        "size": "Large",
        "color": "Red",
        "rippen": "no"      
    }
];
const ds=[
    {
        "Name" : "Trees",
        "Course" : "Intoduction of Trees",
        "Content" : [ "Binary Tree", "BST",
                    "Generic Tree"]
    },
    {
        "Name" : "Graphs",
        "Topics" : [ "BFS", "DFS", "Topological Sort" ]
    }
];
app.get('/',(req, res)=>{
    res.send("home");
} );
fruitrouter.route('/')
.get((req, res)=>{
    res.send(fruits);
 });
fruitrouter.route('/details').get((req, res)=>{
    res.send("about fruits in detail");
} );
app.get('/ds',(req, res)=>{
    res.send(ds);
} );
app.get('/ds/details',(req, res)=>{
    res.send("datastructure topics");
} );
app.use('/fruits',fruitrouter);
app.listen(port, (err)=>{
    if(err)throw err;
    else{
        console.log("using express");
    }
});
