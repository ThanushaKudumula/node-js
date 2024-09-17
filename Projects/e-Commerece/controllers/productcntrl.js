const expressAsyncHandler = require("express-async-handler");
const productModel = require("../models/productModel");
const slugify=require('slugify');
const { get } = require("mongoose");
const { default: slugify } = require("slugify");
const { json } = require("body-parser");
//creating a product
const createproduct = expressAsyncHandler(async (req, res) => {
    try {
        if(req.body.title){
            req.body.slug=slugify(req.body.title)
        }
        const newproduct = await productModel.create(req.body);
        console.log(newproduct)
        res.json(newproduct)
    } catch (error) {
        throw new Error(error);
    }
})
//getting a product
const getaproduct = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findbyid = await productModel.findById(id);
        red.json(findbyid);
    } catch (error) {
        throw new Error(error);
    }
})
const getproduct = expressAsyncHandler(async (req, res) => {
    try {
        //filtering
        const queryobj={...req.query}
        const excludefields=["page", 'sort', 'limit', "fields"];
        excludefields.forEach(element => delete queryobj[element]);
        // const findall=await productModel.where("category").equals(req.query.category)
        // const findall = await productModel.find({
        //     brand:req.query.brand,
        //     category:req. query.category
        // });
        let queryStr=JSON.stringify(queryobj);
        queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>`$${match}`)
        let query=productModel.find(JSON.parse(queryStr))
        //sorting 
        if(req.query.sort){
            const  sortby=req.query.sort.split(",").join(" ")
            query=query.sort(sortby)
        }
        else{
            query=query.sort("-createdAt")
        }
        //limiting the fields 
        if(req. query.fields){
            const fields=req.query.fields.split(",").join(" ");
            query=query.select(fields);
        }
        else{
            query=query.select('-__v');

        }
        //pagination
        const page=req.query.page;
        const limit=req.query.limit;
        const skip=(page-1)*limit;
        query=query.skip(skip).limit(limit);
        if(req.query.page){
            const productcnt=await productModel.countDocuments();
            if(skip>=productcnt)throw new Error("this page doesnt exist")
        }
        const product=await query;
        res.json(product)
    } catch (error) {
        throw new Error(error);
    }
})
//update 
const updateproduct=expressAsyncHandler(async(req, res)=>{
    const id=req.params;
    try{
        const updatebyid=await productModel.findByIdAndUpdate({id}, req.body,{new :true});
        res.json(updatebyid)
    }
    catch(err){
        throw new Error(err)
    }
})
//delete
const deleteproduct=expressAsyncHandler(async(req, res)=>{
    const id=req.params;
    try{
        const deletebyid=await productModel.findByIdAndDelete(id);
        res.json(deletebyid)
    }
    catch(err){
        throw new Error(err)
    }
})

module.exports = { createproduct, getaproduct, getproduct, updateproduct, deleteproduct }