import mongoose from "mongoose";
const { Schema } = mongoose;


const OrderSchema = new Schema(
  {
    gigId: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig' }, // Reference to the Gig collection,
    },
    img: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sellerId: {
      type: String,
      required: true
    },
    buyerId: {
      type: String,
      required: true
    },
    buyerUsername: {
      type: String,
      required: true,
    },
    completion_percentage: {
      type: Number,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    // payment_intent: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
