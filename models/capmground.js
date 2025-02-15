import mongoose from "mongoose";
const Schema =mongoose.Schema;

const CampgroundSchema = new mongoose.Schema({
    title: String,
    location: String,
    img: String,
    price: Number,
    description: String
    
})
const Campground  = mongoose.model("Campgrond",CampgroundSchema);
export default Campground ;