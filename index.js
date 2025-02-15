import express from "express";
import path from 'path';
import mongoose from "mongoose";
import Campground from "./models/capmground.js";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";


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


app.get("/campgrounds", async (req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
    
})

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
})

app.get("/campgrounds/:id", async (req,res)=>{
    const camp = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {camp});
})

app.post("/campgrounds/new", async (req,res)=> {
    const newCamp = new Campground({...req.body.campgrounds});
    await newCamp.save();
    res.redirect('/campgrounds');
})

app.get("/campgrounds/:id/edit", async (req,res) =>{
    const camp = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { camp });
})
app.put("/campgrounds/:id",async (req,res)=>{
    await Campground.findByIdAndUpdate(req.params.id,{...req.body.campgrounds});
    res.redirect(`/campgrounds/${req.params.id}`);
})
app.delete("/campgrounds/:id", async (req,res)=>{
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
})


app.listen(3000, (req ,res)=>{
    console.log("listening on port 30000");
})