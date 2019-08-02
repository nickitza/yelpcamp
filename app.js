var express = require("express"),
    app = express(),
    bodyParser= require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds")

  seedDB()
  mongoose.connect("mongodb://localhost:27017/yelpcamp", { useNewUrlParser: true })
  app.use(bodyParser.urlencoded({extended: true}))
  app.set("view engine", "ejs")

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

app.get('/campgrounds', function(req, res){
  Campground.find({}, function(err, allCamps){
    if(err){
      console.log("**ERR: " + err)
    }else{
      res.render("index", {campgrounds: allCamps})
    }
  })
})


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
      //* redirect back to all campgrounds
      //default is to redirect to the GET route
      res.redirect('/campgrounds')
    }
  })
})
//*new needs to be declared before show
app.get('/campgrounds/new', function(req, res){
  res.render("new.ejs")
})

app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id, function(err, foundCamp){
    if(err){
      console.log(err)
    }else{
      res.render("show", {campground: foundCamp})
    }
  })
})

app.listen(3000, function(){
  console.log("** Yelp Camp server started **")
})