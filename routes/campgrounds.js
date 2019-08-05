var express=require("express")
var router = express.Router()
var Campground = require("../models/campground")


//* CAMPGROUND INDEX
router.get('/', function(req, res){
  Campground.find({}, function(err, allCamps){
    if(err){
      console.log("**ERR: " + err)
    }else{
      res.render("campgrounds/index", {campgrounds: allCamps, currentUser: req.user})
    }
  })
})

//*NEW form needs to be declared before show
router.get('/new', function(req, res){
  res.render("campgrounds/new")
})
//* CREATE campground from form
router.post('/', function(req, res){
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
router.get("/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
    if(err){
      console.log(err)
    }else{
      res.render("campgrounds/show", {campground: foundCamp})
    }
  })
})

module.exports = router