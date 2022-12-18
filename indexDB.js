const express = require("express");
const Joi = require("joi");
// const { result } = require("underscore");
// const { join } = require("path");
//const app = express();
//app.use(express.json());
const mongodb = require("mongoose");
const { string, date, boolean } = require("joi");
const { default: mongoose } = require("mongoose");
// Step 1: connecting to the database
mongodb.connect(
    "mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/test",
    function(err){
    if(err){
        console.log("Not able to connect to MongoDB")
    }else{
        console.log("Connection Successful")
    }
});
// Step 2: create a schema
const courseSchema= new mongodb.Schema({
    name: String,
    author: String,
    tags: [String],
    ispublished: Boolean,
    Date: {type: Date,default:Date.now}
})
// Step 3:  Create a model
const Course = mongodb.model("course", courseSchema);
//finding the courses
// Course.find({author:"Sanjoy"}, function(err,result){
//     if(err){
//         console.log("No Data Found");
//     }else{
//         console.log(result);
//     }
// })

// course.find({query parameter},{values which is needed not to shown},{limit, sorting})
Course.find(
    { author: "Sanjoy" , name:"nodejs" },
    { _id: 0, __v: 0 },
    { sort: { date: 1 }, limit:2 },
    function (result, error) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    }
  );
  
// Step 4: I can add objects/documents 
const newcourse = new Course({
    name:"DSA",
    author:"Alok",
    tags:["Frontend","Structure"],
    ispublished:false
}
)
newcourse.save();
// Steps 5: I can find documents
// I/O operation : Java scripts deal with I/O operations
// Asynchronous Functions
// 