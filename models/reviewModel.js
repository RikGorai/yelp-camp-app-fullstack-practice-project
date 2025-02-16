import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

const Review = mongoose.model("Review",ReviewSchema);
export default Review;