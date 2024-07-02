const http = require("http");
const fs = require("fs");
const url=require("url");
const rf = fs.readFileSync('./index.html', 'utf-8');
const json=JSON.parse(fs.readFileSync('./data/sample.json', 'utf-8'));
const html=fs.readFileSync('./products.html','utf-8')
const prodet=fs.readFileSync('./products-details.html', 'utf-8');
const replacehtml=require('./CustomModule');
// let prohtml=json.map((prod)=>{
    //     let rplce=html.replace('{{%IMAGE%}}', prod.productImage);
    //     rplce=rplce.replace('{{%name%}}', prod.name);
    //     rplce=rplce.replace('{{%modalname%}}', prod.modelName);
    //     rplce=rplce.replace('{{%modelnumber%}}', prod.modelNumber);
    //     rplce=rplce.replace('{{%size%}}', prod.size);
    //     rplce=rplce.replace('{{%camera%}}', prod.camera);
    //     rplce=rplce.replace('{{%price%}}', prod.price);
    //     rplce=rplce.replace('{{%color%}}', prod.color);
    //     rplce=rplce.replace('{{%ID%}}', prod.id);
    //     return rplce;
    // });
// function replacehtml(template, product){
//     let rplce=template.replace('{{%IMAGE%}}', product.productImage);
//     rplce=rplce.replace('{{%name%}}', product.name);
//     rplce=rplce.replace('{{%modalname%}}', product.modelName);
//     rplce=rplce.replace('{{%modelnumber%}}', product.modelNumber);
//     rplce=rplce.replace('{{%size%}}', product.size);
//     rplce=rplce.replace('{{%camera%}}', product.camera);
//     rplce=rplce.replace('{{%price%}}', product.price);
//     rplce=rplce.replace('{{%color%}}', product.color);
//     rplce=rplce.replace('{{%ID%}}', product.id);
//     return rplce;
// }
const server = http.createServer((req, res) => {
    let {query, pathname:path}=url.parse(req.url, true);
    // let path = req.url;
    // console.log(x);
    if (path == '/' || path.toLocaleLowerCase() === '/home') {
        res.writeHead(200,{
            'Content-Type':'text/html',
            'my-header':'hello world'
        });
        res.end(rf.replace('{{%CONTENT%}}', "you are in home page"));
    }
    else if (path === '/about') {
        res.writeHead(200, {
            'Content-Type':'text/html',
            'my-header':'hello world'
        });
        res.end(rf.replace('{{%CONTENT%}}', "you are in about page"));
    }
    else if (path === '/edu') {
        res.writeHead(200, {
            'Content-Type':'text/html',
            'my-header':'hello world'
        });
        res.end(rf.replace('{{%CONTENT%}}', "you are in education page"));
    }
    else if (path === '/skill') {
        res.writeHead(200, {
            'Content-Type':'text/html',
            'my-header':'hello world'
        });
        res.end(rf.replace('{{%CONTENT%}}', "you are in skills page"));
    }
    else if (path === '/projects') {
        res.writeHead(200, {
            'Content-Type':'text/html',
            'my-header':'hello world'
        });
        res.end(rf.replace('{{%CONTENT%}}', "you are in projects page"));
    }
    else if (path === '/contact') {
        res.writeHead(200, {
            'Content-Type':'text/html',
            'my-header':'hello world'
        });

        res.end(rf.replace('{{%CONTENT%}}', "you are in contact page"));
    }
    else 
    if(path.toLocaleLowerCase()==='/product'){
        if(!query.id){
            let producthtmlarray =json.map((prod)=>{
               return  replacehtml(html,prod);
            })
             let proreshtml=rf.replace('{{%CONTENT%}}', producthtmlarray)
             res.writeHead(200, {
                    'Content-Type':'text/html',
                    'my-header':'hello world'
             });
             res.end(proreshtml);
        }
        else {
            let prod=json[query.id];
            let proddetailshtml=replacehtml(prodet, prod);
            res.end(rf.replace("{{%CONTENT%", proddetailshtml));
        }   
    }
    else {
        res.writeHead(404);
        // res.end(rf.replace('{{%CONTENT%}}', "error! 404 page not foud"));
    }
})
server.listen(8000);