let exp=require('express');
let dsrouter=exp.Router();
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
dsrouter.route('/').get((req, res)=>{
    res.send(ds);
} );
dsrouter.route('/details').get((req, res)=>{
    res.send("datastructure topics");
} );
module.exports=dsrouter;