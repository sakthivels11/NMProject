import mongoose from "mongoose";
const { Schema } = mongoose;

const CategoriesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    cat_desc: {
        type: String,
        // required: true
    },
    cat_img: {
        type: String,
        // required: true,
    },
});


export default mongoose.model("GigCategories", CategoriesSchema);