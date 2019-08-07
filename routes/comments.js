var express=require("express")
var router = express.Router({mergeParams: true})
var Campground= require("../models/campground")
var Comment = require("../models/comment")


//*NEW COMMENT
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err)
    }else{
      res.render("comments/new", {campground: campground})
    }
  })
})

//*CREATE COMMENT
router.post("/campgrounds/:id/comments", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err)
      res.redirect("/campgrounds")
    }else{
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err)
        }else {
          comment.author.id = req.user._id
          comment.author.username = req.user.username
          comment.save()
          campground.comments.push(comment)
          campground.save()
          res.redirect("/campgrounds/"+campground._id)
        }
      })
    }  
  }
)})
//*EDIT COMMENT
router.get('/campgrounds/:id/comments/:comment_id/edit', function(req, res){
  res.send("Edit Comment Page")
})

//*UPDATE COMMENT
router.post('/campgrounds/:id/comments/:comment_id', function(req, res){
  
})

//*DESTROY COMMENT
router.delete('/campgrounds/:id/comments/:comment_id', function(req, res){
  res.redirect('')
})


//*Middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/login')
}

module.exports = router