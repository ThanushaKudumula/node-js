
//not found

const notfound=(req, res, next)=>{
    const err=new Error(`not found : ${req.originalUrl}`);
    res.status(404);
    next(err);
}

//error handler
const errorhandler=(err, req, res, next)=>{
    const statuscode=res.statusCode==200?500:res.statusCode
    res.status(statuscode)
    res.json({
        message:err.message,
        stack:err.stack
    })
}

module.exports={notfound, errorhandler};