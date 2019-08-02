var express = require("express"),
    app = express(),
    bodyParser= require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds")
    Comment = require('./models/comment')

    mongoose.connect("mongodb://localhost:27017/yelpcamp", { useNewUrlParser: true })
    app.use(bodyParser.urlencoded({extended: true}))
    app.set("view engine", "ejs")
    app.use(express.static(__dirname + "/public"))
    seedDB()

// var campgrounds = [
//   {name: "São Paolo Grounds", image:"https://images.pexels.com/photos/2376989/pexels-photo-2376989.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
//   {name:"Gwynedd Campground", image:"https://images.pexels.com/photos/1462014/pexels-photo-1462014.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
//   {name: "Dead Horse Peak", image:"https://images.pexels.com/photos/2496880/pexels-photo-2496880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
//   {name: "Salmon Creek", image:"https://images.pexels.com/photos/2412023/pexels-photo-2412023.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
//   {name:"Perranport Beach Campground", image:"https://images.pexels.com/photos/1376960/pexels-photo-1376960.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"},
//   {name: "Seal Beach", image:"https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500"},
//   {name: "Wales Park", image:"https://images.pexels.com/photos/587976/pexels-photo-587976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
// ]

app.get('/', function(req, res){
  res.render("landing")
})
//* INDEX
app.get('/campgrounds', function(req, res){
  Campground.find({}, function(err, allCamps){
    if(err){
      console.log("**ERR: " + err)
    }else{
      res.render("campgrounds/index", {campgrounds: allCamps})
    }
  })
})

//*NEW form needs to be declared before show
app.get('/campgrounds/new', function(req, res){
  res.render("campgrounds/new")
})
//* CREATE campground from form
app.post('/campgrounds', function(req, res){
  //TODO get data from form and add to campgrounds array
  //you can test .post routes using postman
  var name = req.body.name
  var image = req.body.image
  var description = req.body.description
  var newCamp = {name: name, image: image, description: description}
  Campground.create(newCamp, function(err, newCamp){
    if(err){
      console.log(err)
    }
    else{
      //default is to redirect to the GET route
      res.redirect('/campgrounds')
    }
  })
})

//*SHOW campground
app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
    if(err){
      console.log(err)
    }else{
      res.render("campgrounds/show", {campground: foundCamp})
    }
  })
})
//TODO||||||||||||||||||||| COMMENTS ROUTES |||||||||||||||||||||||||||

//*NEW COMMENT
app.get("/campgrounds/:id/comments/new", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err)
    }else{
      res.render("comments/new", {campground: campground})
    }
  })
})

//*CREATE COMMENT
app.post("/campgrounds/:id/comments", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err)
      res.redirect("/campgrounds")
    }else{
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err)
        }else {
           campground.comments.push(comment)
           campground.save()
           res.redirect("/campgrounds/"+campground._id)
          }
      })
    }  
  }
)})













// =========================================================================
app.listen(3000, function(){
  console.log("** Yelp Camp server started **")
})