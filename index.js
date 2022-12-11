const express = require('express')
const app = express()
app.use(express.json());
const courses = [{
    id: 1,
    name : "Javascript"    
},
{
    id: 2,
    name : "React"
},
{
    id: 3,
    name : "FSD"
}];

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get("/courses", function(req,res){
    res.send(courses);
})
app.get("/courses/:id", function(req,res){
    let courseId = req.params.id;
    // res.send(courseId);
    let a = courses.find(ele => ele.id === parseInt(courseId));
    if(!a){
        res.status(404).send("course not found");
    } else {
        res.send(a);
    }
})

///POST
app.post("/course", function (req, res) {
    //course object
    var course = {
      id: courses.length + 1,
      name: req.body.name,
    };
    //push that object into the courses array
    courses.push(course);
    res.send(course);
  });  

app.listen(3000)
console.log("Running the 3000");