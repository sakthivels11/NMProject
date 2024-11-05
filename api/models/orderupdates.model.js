import mongoose from "mongoose";
const { Schema } = mongoose;


const OrderUpdatesSchema = new Schema(
    {
        orderId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        complete: {
            type: Boolean,
            default: false,
        },
    }, {
    timestamps: true
}
);


export default mongoose.model("order_updates", OrderUpdatesSchema);