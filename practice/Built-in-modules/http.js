const http=require('http');
const requestListener=(req, res)=>{
    res.end("this is a http built in module");
}
const server=http.createServer(requestListener);
server.listen(2000,()=>{
    console.log('server has started');
});
