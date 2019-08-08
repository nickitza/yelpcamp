var express = require("express"),
    app = express(),
    bodyParser= require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"),
    Comment = require('./models/comment'),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require('./models/user'),
    methodOverride = require("method-override"),
    flash = require("connect-flash")

var commentRoutes = require("./routes/comments")
var campgroundRoutes = require("./routes/campgrounds")
var indexRoutes = require("./routes/index")

  mongoose.connect("mongodb://localhost:27017/yelpcamp", { useNewUrlParser: true })
  app.use(bodyParser.urlencoded({extended: true}))
  app.set("view engine", "ejs")
  app.use(express.static(__dirname + "/public"))
  app.use(methodOverride("_method"))
  // seedDB() 
  app.use(require("express-session")({
    secret: "Eric is a babe",
    resave: false,
    saveUninitialized: false
  }))
  app.use(flash())
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy(User.authenticate()))
  passport.serializeUser(User.serializeUser())
  passport.deserializeUser(User.deserializeUser())
  app.use(function(req,res,next){
    res.locals.currentUser = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next()
  })
  app.use(commentRoutes)
  app.use(indexRoutes)
  app.use("/campgrounds", campgroundRoutes)

// =========================================================================
app.listen(3000, function(){
  console.log("** Yelp Camp server started **")
})