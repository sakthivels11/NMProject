import gig_categories from "../models/gigcategories.model.js";
import createError from "../utils/createError.js";





export const getGigCategories = async (req, res, next) => {
    try {
        const categories = await gig_categories.find();
        if (!categories) next(createError(404, "Categories not found!"));
        res.status(200).send(categories);
    } catch (err) {
        next(err);
    }
};