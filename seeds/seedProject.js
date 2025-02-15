import mongoose from 'mongoose';
import Campground from '../models/capmground.js';
import { cities } from './cities.js';
import { descriptors, places } from './seedHelpers.js';



mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Database connected for data insertion"));

const ctitle = (arr)=> arr[Math.floor(Math.random()* arr.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 100; i++) {
        const randomCity=Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random() * 100)+20;
        const camp = new Campground(
            {
                title: `${ctitle(descriptors)} ${ctitle(places)}`,
                location:`${cities[randomCity].city} , ${cities[randomCity].state}`,
                img: 'https://picsum.photos/400?random=${Math.random()}',
                description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum reiciendis perferendis reprehenderit, nulla illo inventore facere pariatur, non hic dolorem magnam? Veritatis esse minima sit fuga provident nihil doloribus necessitatibus.',
                price

            });
            await camp.save();
    }

}

seedDB().then(()=>db.close());
