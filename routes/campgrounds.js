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
router.get('/new', isLoggedIn, function(req, res){
  res.render("campgrounds/new")
})
//* CREATE campground from form
router.post('/', isLoggedIn, function(req, res){
  var name = req.body.name
  var image = req.body.image
  var description = req.body.description
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCamp = {name: name, image: image, description: description, author: author}
  Campground.create(newCamp, function(err, newCamp){
    if(err){
      console.log(err)
    }
    else{
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

//*EDIT
  router.get("/:id/edit", checkOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
      res.render("campgrounds/edit", {campground: foundCampground})
    })
  })

//*UPDATE
router.put("/:id", checkOwnership, function(req,res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
    if(err){
      res.redirect("/campgrounds")
    }else{
      res.redirect('/campgrounds/' + updatedCamp._id )
    }
  })
})

//*DESTROY
router.delete("/:id", checkOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds")
    }else{
      res.redirect("/campgrounds")
    }
  })
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/login')
}

function checkOwnership (req, res, next){
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
        res.redirect('back')
      } else {
        if(foundCampground.author.id.equals(req.user._id)){
          next()
        } else    {
          res.redirect("back")
        }
      }
    })
  } else {
    res.redirect("back")
  }
}

module.exports = router;