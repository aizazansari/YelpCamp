var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req,res){
  res.render("landing");
});

//Schema setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create(
//   {
//     name: "Shimla Pahari",
//     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Mount_Wilhelm.jpg/330px-Mount_Wilhelm.jpg",
//     description: "pahari in lahore"
//   }, function(err,campground){
//     if(err){
//       console.log(err);
//     } else{
//       console.log("New campground added: ");
//       console.log(campground);
//     }
//   }
// );
// var campgrounds = [
//   {name: "Shimla Pahari", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Mount_Wilhelm.jpg/330px-Mount_Wilhelm.jpg"},
//   {name: "Margalla hills", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Vihren_Pirin_IMG_8898.jpg/330px-Vihren_Pirin_IMG_8898.jpg"},
//   {name: "Karakoram", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/GlarusAlps.jpg/330px-GlarusAlps.jpg"},
//   {name: "Shimla Pahari", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Mount_Wilhelm.jpg/330px-Mount_Wilhelm.jpg"},
//   {name: "Margalla hills", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Vihren_Pirin_IMG_8898.jpg/330px-Vihren_Pirin_IMG_8898.jpg"},
//   {name: "Karakoram", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/GlarusAlps.jpg/330px-GlarusAlps.jpg"},
// ]
app.get("/campgrounds", function(req,res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("index",{campgrounds:allCampgrounds});
    }
  });
});

app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name:name, image:image, description:description};
    Campground.create(newCampground, function(err,newlyCreated){
      if(err){
        console.log(err);
      } else {
        res.redirect("/campgrounds");
      }
    });
});

app.get("/campgrounds/new", function(req,res){
res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req,res){
Campground.findById(req.params.id, function(err,foundCampground){
  if(err){
    console.log(err);
  } else {
      res.render("show", {campground: foundCampground});
  }
});
});

app.listen(3000, function(){
  console.log("App running on port 3000");
});
