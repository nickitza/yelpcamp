var express = require("express"),
    app = express(),
    bodyParser= require("body-parser"),
    mongoose = require("mongoose")


mongoose.connect("mongodb://localhost/yelpcamp")
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

//* Schema setup:
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
})

//* compile schema into a model
var Campground = mongoose.model("Campground", campgroundSchema)

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
      res.render("campgrounds", {campgrounds: allCamps})
    }
  })
})

app.post('/campgrounds', function(req, res){
  //TODO get data from form and add to campgrounds array
  //you can test .post routes using postman
  var name = req.body.name
  var image = req.body.image
  var newCamp = {name: name, image: image}
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

app.get('/campgrounds/new', function(req, res){
  res.render("new.ejs")
})

app.listen(3000, function(){
  console.log("** Yelp Camp server started **")
})