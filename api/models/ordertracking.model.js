import mongoose from "mongoose";
const { Schema } = mongoose;


const OrderTrackingSchema = new Schema(
    {
        orderId: {
            type: String,
            required: true
        },
        sellerId: {
            type: String,
            required: true // 
        },
        buyerId: {
            type: String,
            required: true
        },
    }
)


export default mongoose.model("order_tracking", OrderTrackingSchema);