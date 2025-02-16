import Joi from "joi";
import ExpressError from "./errorHandleClass.js";


const campgroundSchema = Joi.object({
    campgrounds: Joi.object({
        title: Joi.string().required(),
        location: Joi.string().required(),
        img: Joi.string().required(),
        price: Joi.number().required().min(1).max(3000),
        description: Joi.string().required()
    }).required()
});

const validateCamp = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, msg);
    }
    else {
        next();
    }
}


export default validateCamp;