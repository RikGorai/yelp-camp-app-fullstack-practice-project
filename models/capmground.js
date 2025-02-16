import mongoose from "mongoose";
import Review from "./reviewModel.js";
const Schema =mongoose.Schema;

const CampgroundSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
        },
    location: {
        type: String,
        required: true
        },
    img: {
        type: String,
        required: true
        },
    price: {
        type: Number,
        required: true
        },
    description: {
        type: String,
        required: true
        },
    reviews: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Review'
        }
    ]
    
})

CampgroundSchema.post("findOneAndDelete", async function (doc) {
    if(doc){
        await Review.deleteMany({ _id: { $in: doc.reviews}});
    }
    
})


const Campground  = mongoose.model("Campgrond",CampgroundSchema);
export default Campground ;