import express from "express";
import Campground from "../models/capmground.js";
import catchError from "../utils/catchAppError.js";
import Review from "../models/reviewModel.js";
import validateReview from "../utils/joiReviewValidation.js";

const Router = express.Router({mergeParams: true});



Router.post("/", validateReview, catchError(async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    const review = await new Review({ ...req.body.review });
    camp.reviews.push(review);
    await review.save();
    await camp.save();
    req.flash("success", "Successfuly added your Review");
    res.redirect(`/campgrounds/${camp._id}`);
}));

Router.delete("/:reviewId", catchError(async (req,res) => {
    const {id,reviewId} = req.params;
    await Campground.findByIdAndUpdate(id,{ $pull: { reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfuly deleted your Review");
    res.redirect(`/campgrounds/${id}`);
}));


export default Router;

