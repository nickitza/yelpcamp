var express = require("express"),
    app = express(),
    bodyParser= require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"),
    Comment = require('./models/comment'),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require('./models/user')

    mongoose.connect("mongodb://localhost:27017/yelpcamp", { useNewUrlParser: true })
    app.use(bodyParser.urlencoded({extended: true}))
    app.set("view engine", "ejs")
    app.use(express.static(__dirname + "/public"))
    seedDB()

    app.use(require("express-session")({
      secret: "Eric is a babe",
      resave: false,
      saveUninitialized: false
    }))

    app.use(passport.initialize())
    app.use(passport.session())
    passport.use(new LocalStrategy(User.authenticate()))
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())

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
//*AUTH ROUTES
app.get("/register", function(req, res){
  res.render("register")
})
app.post("/register", function(req, res){
  var newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err)
      return res.render("register")
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds")
    })
  })

})












// =========================================================================
app.listen(3000, function(){
  console.log("** Yelp Camp server started **")
})