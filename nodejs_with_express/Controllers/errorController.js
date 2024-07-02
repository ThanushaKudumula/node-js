
const customerror = require('./../utils/customerror');
const devErrors=(res, error)=>{
    res.status(error.statusCode).json({
        status:error.status,
        message:error.message,
        stackTrace:error.stack,
        error:error
    });
}

const casrErrorHandler=(err)=>{
    const msg=`invalid id ${err.value} for field ${err.path}`
    new customerror()
}
const prodErrors=(res, error)=>{
    if(error.isOperational){
        res.status(error.statusCode).json({
            'status':error.status,
            'message':error.message,
        });
    }else{
        res.status(500).json({
            status:'error',
            message:"something went wrong!please try again"
        })
    }
}
module.exports=((error,req,res, next )=>{
    error.statusCode=error.statusCode || 404;
    error.status=error.status || 'error';
    if(process.env.NODE_ENV==='development'){
        devErrors(res, error);
    }else if(process.env.NODE_ENV==='production'){
        if(error.name==='castError'){
            casrErrorHandler(error);
        }
        prodErrors(res, error);
    }
})