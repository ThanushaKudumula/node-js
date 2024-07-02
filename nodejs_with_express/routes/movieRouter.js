const express=require('express');
const moviesController=require('./../Controllers/movieControllers');
const router=express.Router();

// this middleware gets exceuted when the url endpoints contains id 
// router.param('id', moviesController.checkID);

router.route('/')
    .get(moviesController.getAllmovies)
    .post(moviesController.insertmovie)
router.route('/:id')
    .get(moviesController.getmoviebyId)
    .put(moviesController.updatemoviebyid)
    .patch(moviesController.patchmoviebyID)
    .delete(moviesController.deletemoviebyID)
module.exports=router;