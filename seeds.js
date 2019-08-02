var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment")

var data = [
  {
    name: "São Paolo Grounds",
    image: "https://images.pexels.com/photos/2376989/pexels-photo-2376989.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Gorgeous views"
    
  },
  {
    name:"Gwynedd Campground", 
    image:"https://images.pexels.com/photos/1462014/pexels-photo-1462014.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Minimalist camping on Welsh coast"
  },
  {
    name: "Dead Horse Peak", 
    image:"https://images.pexels.com/photos/2496880/pexels-photo-2496880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Remote area with moderate hiking"
  },
  {
    name: "Salmon Creek", 
    image:"https://images.pexels.com/photos/2412023/pexels-photo-2412023.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Fishing permitted"
  }
]

function seedDB(){
  Campground.remove({}, function(err){
    console.log("||Removed All Campgrounds||")
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if(err){
          console.log(err)
        }else{
          console.log("||Campground Added||")
          Comment.create({
            text: "Moderate cliff scaling",
            author: "Betsy Jones"
          }, function(err, comment){
            if(err){
              console.log(err)
            }else{
              campground.comments.push(comment);
              campground.save()
              console.log("||comment added||")
            }
          }
          )
        }
      })
    })
  })
}

module.exports= seedDB