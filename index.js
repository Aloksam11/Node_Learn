const express = require("express");
const Joi = require("joi");
const { join } = require("path");
const app = express();
app.use(express.json());
const courses = [
  {
    id: 1,
    name: "javascript",
  },
  {
    id: 2,
    name: "react",
  },
  {
    id: 3,
    name: "FSD",
  },
];

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get("/courses", function (req, res) {
  res.send(courses);
});
app.get("/courses/:id", function (req, res) {
  var courseId = req.params.id;
  //array.find
  //array.push
  var course = courses.find((c) => c.id === parseInt(courseId));
  if (!course) {
    res.status(404).send("Course not found");
  } else res.send(course);
});

//post servidce
app.post("/course", function (req, res) {
  //course object
  //validation of the input
  const validateResult = validateCourse(req.body);
  console.log(validateResult);

  if (validateResult.error) res.send(validateResult.error);
  else {
    var course = {
      id: courses.length + 1,
      name: req.body.name,
    };
    //push that object into the courses array
    courses.push(course);
    res.send(course);
  }
});

//PUT Code
app.put("/courses/:id", function (req, res) {
    const validateResult = validateCourse(req.body);
    console.log(validateResult);
  
    if (validateResult.error) res.send(validateResult.error);
    else {
      var courseId = req.params.id;
      var course = courses.find((c) => c.id === parseInt(courseId));
      let courseindex = courses.findIndex((c) => c.id === parseInt(courseId));
      courses[courseindex].name = req.body.name;
      res.send(courses[courseindex]);
  
      //update the course in that index
      //how do we update a particular object in an array
      //
    }
  });
  app.delete("/courses/:id", function (req, res){
    var courseId = req.params.id;
      let courseindex = courses.findIndex((c) => c.id === parseInt(courseId));
      res.send(courses.splice(courseindex,1)); 
  })
  

app.listen(3000);
console.log("listening the server on port 3000");
//JOI module and validate the input for post request
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  try {
    const result = schema.validate(course);
    return result;
  } catch (err) {
    return err;
  }
}

