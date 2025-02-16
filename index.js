import express from "express";
import path from 'path';
import mongoose from "mongoose";
import Campground from "./models/capmground.js";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import catchError from "./utils/catchAppError.js";
import ExpressError from "./utils/errorHandleClass.js";
import validateCamp from "./utils/joiCampgroundValidation.js";
import Review from "./models/reviewModel.js";
import validateReview from "./utils/joiReviewValidation.js";


const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open",()=>console.log("Database Connected"));

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
// console.log(import.meta)

app.use(express.static(path.join(import.meta.dirname, "public")));
// app.use(express.static(path.join(__dirname,"views","layout")))
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("viwes", path.join(import.meta.dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));





app.get("/campgrounds", catchError(async (req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
    
}));

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", catchError(async (req,res)=>{
    const camp = await Campground.findById(req.params.id).populate("reviews");
    res.render('campgrounds/show', {camp});
}));

app.post("/campgrounds/new", validateCamp, catchError(async (req,res)=> {
    const newCamp = new Campground({...req.body.campgrounds});
    const newC = await newCamp.save();
    res.redirect(`/campgrounds/${newC._id}`);
}));

app.get("/campgrounds/:id/edit", catchError( async (req,res) =>{
    const camp = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { camp });
}));
app.put("/campgrounds/:id", validateCamp,catchError(async (req,res)=>{
    await Campground.findByIdAndUpdate(req.params.id,{...req.body.campgrounds});
    res.redirect(`/campgrounds/${req.params.id}`);
}));
app.delete("/campgrounds/:id", catchError(async (req,res)=>{
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
}));


app.post("/campgrounds/:id/review", validateReview, catchError(async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    const review = await new Review({ ...req.body.review });
    camp.reviews.push(review);
    await review.save();
    await camp.save();
    res.redirect(`/campgrounds/${camp._id}`);
}));

app.delete("/campgrounds/:id/review/:reviewId", catchError(async (req,res) => {
    const {id,reviewId} = req.body;
    await Campground.findByIdAndUpdate(id,{ $pull: { reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}))




app.use( /(.*)/, (req,res,next) => {
    next(new ExpressError(404, "Page not found.... :("));
})

app.use((err,req,res,next) => {
    const { status = 500, message = "Something went Wrong.... :(" } = err;
    err.message = err.message || "Something went Wrong.... :(";
    console.log(err);
    res.status(status).render("error",{err});
})

app.listen(3000, (req ,res)=>{
    console.log("listening on port 3000");
})


