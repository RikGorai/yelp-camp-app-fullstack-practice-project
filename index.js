import express from "express";
import path from 'path';
import mongoose from "mongoose";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import ExpressError from "./utils/errorHandleClass.js";
import CampgroundRoutes from "./routes/campgroundsRoutes.js";
import ReviewRoutes from "./routes/reviewRoutes.js"
import session from "express-session";
import sessionConfig from "./utils/sessionConfig.js";
import flash from "connect-flash";



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

app.use(session(sessionConfig));
app.use(flash());

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();

})



app.use("/campgrounds",CampgroundRoutes);

app.use("/campgrounds/:id/review", ReviewRoutes);





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


