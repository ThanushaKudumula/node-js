let http=require('http');

let server=http.createServer((req, res)=> {
    res.write('<h1> this is a http built in module<h1>');
    res.end();
})
server.listen(1200);