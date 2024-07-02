let fs=require('fs');
let http=require('http');
http.createServer((req, res)=>{
    fs.readFile('sample1.json','utf-8', (err, data)=>{
        if(err)throw err;
        console.log(data);
        res.write(data);
        res.end();
    })
}).listen(6090);