var express = require("express")
var app = express()
// app.use("engine views", "ejs")

app.get('/', function(req, res){
  res.send("Landing Page holder")
})

app.listen(3000, function(){
  console.log("** Yelp Camp server started **")
})