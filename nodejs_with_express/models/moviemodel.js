const mongoose=require("mongoose");
const movieschema=new mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    duration:{
        type:Number,
        required:true
    },
    ratings:{
       type: Number,
       validate:{
        validator:function(value){
            return value>=1 && value<=10
        },
        message: "ratings ({VALUE}) should be above 1 and below 10"
       },
    totalRating:Number,
    releaseYear:Number,
    releaseDate:{
        type:Date
    },
    genres:{
        type:[String]
    },
    directors:{
        type:[String]
    },
    coverImage:{
        type:String
    },
    actors:{
        type:[String]
    },
    price:{
        type:Number
    },
    createdBy:{
        type:String
    }
}});

const movie=mongoose.model('favouritemovies', movieschema);
module.exports=movie;
// , {
//     toJSON:{virtuals:true},toObject:{virtuals:true}
//Document Middleware
// movieschema.pre("save", function(next){
//     this.createdBy="Thanusha";
//     next();
// })
// movieschema.post('remove', function(doc, next){
//     console.log("document has remove" +doc);
//     next();
// })
//query middleware
// movieschema.pre('find', function(next) {
//     this.find({releaseYear:{$lte:2017}})
//     next();
// });
//query middleware
// movieschema.pre('find', function(next) {
//     this.where('releaseYear').lte(2018);
//     next();
// });
//aggregate middleware
// movieschema.pre('aggregate', function(next) {
//     const pipeline = this.pipeline();
//     // Add a $match stage to filter movies by rating greater than 7
//     pipeline.unshift({
//       $match: {
//         ratings: { $gt: 7 }
//       }
//     });
//     // Add a $group stage to group movies by name and select the first occurrence of each field
//     pipeline.push({
//       $group: {
//         _id: "$name",
//         price: { $first: "$price" }
//       }
//     });
//     next();
//   });
  
// movieschema.virtual('durationInHours').get(function(){
//     return this.duration/60;
// })
// const movie=mongoose.model('favouritemovies', movieschema);
// module.exports=movie;
// const insert_documents=new movie({
//         name:"jersey",
//         hero:"naani",
//         heroine: "",
//         duration:150,
//         rating:10.0
// });
// insert_documents.save().then((doc)=>{
//     console.log(doc);
// }) // save method returns apromise
// .catch(err=>{
//     console.log('error occured'+ err);
// })