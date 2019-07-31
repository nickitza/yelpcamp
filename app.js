var express = require("express")
var app = express()
app.set("view engine", "ejs")

var campgrounds = [
  {name: "Salmon Creek", image:"https://images.pexels.com/photos/2412023/pexels-photo-2412023.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
  {name:"Perranport Beach Campground", image:"https://images.pexels.com/photos/1376960/pexels-photo-1376960.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"},
  {name: "Dead Horse Peak", image:"https://images.pexels.com/photos/2496880/pexels-photo-2496880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
  {name: "Zion National Park", image:"https://images.pexels.com/photos/2071563/pexels-photo-2071563.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
  
]

app.get('/', function(req, res){
  res.render("landing")
})

app.get('/campgrounds', function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds})
})

app.listen(3000, function(){
  console.log("** Yelp Camp server started **")
})