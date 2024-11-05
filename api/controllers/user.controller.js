import User from "../models/user.model.js";
import Gig from "../models/gig.model.js";
import Order from "../models/order.model.js"
import OrderUpdates from "../models/orderupdates.model.js";
import createError from "../utils/createError.js";


export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const gigs = await Gig.find({ userId:req.params.id })
    const orders = await Order.find({ buyerId:req.params.id })
    orders.forEach(async order => {
        await OrderUpdates.deleteMany({ orderId: order._id })
    })
    await User.findByIdAndDelete(req.params.id);
    await Order.findByIdAndDelete(req.params.id);
    console.log("GIGS: ",gigs);
    console.log("ORDERS: ",orders);

    console.log("User Deleted.");
    res.status(200).send("User Deleted Successfully.");
  }
  catch (err) {
    console.log("Error in user Deletion");
    console.log(err)
    next(err)
  }
};


export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).send(user);
};



export const getallUsers = async (req, res) => {
  const user = await User.find({ isAdmin: false });
  res.status(200).send(user);
};
