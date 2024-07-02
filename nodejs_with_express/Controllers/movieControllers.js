const movie=require('./../models/moviemodel');
const asyncerrorhandler=require('./../utils/asyncerrorhandler');
const customerror=require('./../utils/customerror');
exports.getAllmovies= asyncerrorhandler(async(req, res, next)=>{   
        const movieee= await movie.find();
        res.status(200).json(movieee);
})
exports. getmoviebyId=asyncerrorhandler(async (req, res, next)=>{  
    const moviee=await movie.findById(req.params.id);
    if(!moviee){
        const err=new customerror(`movie with ${req.originalUrl} not found`, 404);
        return next(err);
    } 
    res.status(200).json(moviee);
});
exports.updatemoviebyid=(req, res)=>{   
};
exports.patchmoviebyID= async (req, res)=>{
    try{
        const moviee=await movie.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
         res.status(200).json(moviee);
    }
    catch(err){
        res.status(404).json(err);
     }
}
exports.deletemoviebyID=async (req, res)=>{
    try{
        const moviee=await movie.remove(req.params.id);
        res.status(200).json(moviee);
    }
    catch(err){
        res.status(404).json(err);
     }
};
exports.insertmovie= asyncerrorhandler(async (req, res)=>{
    // approach 1 using save()
    // const insert_documents=new movie({});
    // insert_documents.save();  
    //apprach 2 using create()  both approaches return promise
        const moviee=  await movie.create(req.body);
        if(!moviee){
        const err= new customerror(`movie with  ${req.originalUrl} in the server`, 404);
        }
        res.status(201).json(moviee);
   
});
exports.deletemovie=async (req, res)=>{
    try{
        await movie.deleteMany();
        console.log("data successfully deleted");
    }
    catch(err){
        console.log(err.message);
    }
}