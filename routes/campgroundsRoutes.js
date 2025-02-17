import express from "express";
import catchError from "../utils/catchAppError.js";
import validateCamp from "../utils/joiCampgroundValidation.js";
import Campground from "../models/capmground.js";

const Router = express.Router();


Router.get("/", catchError(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });

}));

Router.get("/new", (req, res) => {
    res.render("campgrounds/new");
});

Router.get("/:id", catchError(async (req, res) => {
    const camp = await Campground.findById(req.params.id).populate("reviews");
    if(!camp){
        req.flash("error","Cannot find that Campground");
        return res.redirect("/campgrounds");
    }
    res.render('campgrounds/show', { camp });
}));

Router.post("/new", validateCamp, catchError(async (req, res) => {
    const newCamp = new Campground({ ...req.body.campgrounds });
    const newC = await newCamp.save();
    req.flash("success","Successfuly Created Campground");
    res.redirect(`/campgrounds/${newC._id}`);
}));

Router.get("/:id/edit", catchError(async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    if (!camp) {
        req.flash("error", "Cannot find that Campground");
        return res.redirect("/campgrounds");
    }
    res.render('campgrounds/edit', { camp });
}));
Router.put("/:id", validateCamp, catchError(async (req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campgrounds });
    req.flash("success", "Successfuly Updated Campground");
    res.redirect(`/campgrounds/${req.params.id}`);
}));
Router.delete("/:id", catchError(async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    req.flash("success", "Successfuly Deleted Campground");
    res.redirect('/campgrounds');
}));

export default Router;