import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import User from "../models/user.model.js"
import Order_tracking from "../models/ordertracking.model.js";
import Stripe from "stripe";


export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const gig = await Gig.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};


export const createOrder = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId)
    const currentUser = await User.findById(req.userId);
    console.log(currentUser);
    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      buyerUsername: currentUser.username,
      sellerId: gig.userId,
      price: gig.price,
      // payment_intent: paymentIntent.id,
    });
    if(newOrder.buyerId===newOrder.sellerId){
      console.log
      throw new Error("Buyer ID and Seller ID Matched. Cannot Create Order")
    }
    await newOrder.save()

    await Gig.findOneAndUpdate(
      { _id: req.params.gigId},
      {
        $inc: {
          "sales": 1
        },
      },
    )

    const newOrderTracking = new Order_tracking({
      orderId: newOrder._id,
      sellerId: gig.userId,
      buyerId: req.userId,
    })
    
    await newOrderTracking.save();

    res.status(200).send("Successfully placed order and created order tracking.")
    console.log("Successfully Placed Order")

  } catch (error) {
    console.log("Error in order creation")
    console.log(error)
    next(error);

  }
};



export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: false,
    });
    // console.log("Orders: ", orders);
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};


export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
    // console.log("Orders: ", orders);
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    await Order.findByIdAndDelete(req.params.id);
    console.log("Order Deleted");
    res.status(200).send("Order Deleted Successfully.");
  }
  catch (err) {
    console.log("Error in Order Deletion");
    console.log(err)
    next(err)
  }
};


export const modifyOrderCompletion = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      { _id: req.params.orderId },
      {
        $set: {
          "isCompleted": true,
          "completion_percentage": 100,
        },
      },
    )
    console.log("Order Marked as Complete");
    res.status(200).send(order);
  } catch (error) {
    console.log("Error in OrderCompletion Modification")
    next(error);
  }
}


// export const getSingleOrder = async (req, res, next) => {
//   try {
//     const orders = await Order.findById(req.params.orderId);
//     console.log("Order: ", orders);
//     res.status(200).send(orders);
//   } catch (err) {
//     next(err);
//   }
// };

// export const orderProjectTracking = async (req, res, next) => {
//   try {
//     console.log("Hello12345")
//     const order_to_update = await Order.findByIdAndUpdate(
//       { _id: req.params.orderId },
//       {
//         $push: {
//           "project_tracking": {
//             "title": req.body.title,
//             "project_info": req.body.project_info,
//           },

//         },
//         $set: {
//           "completion_percentage": req.body.completion_percentage
//         },

//       },
//     );
//     res.status(201).send("Order Tracking Has Been Updated");
//     return order_to_update;
//   }
//   catch (err) {
//     next(err);
//   }
// }

// export const orderProjectTrackingModify = async (req, res, next) => {
//   try {
//     const orders = await Order.findOneAndUpdate(
//       { "_id": req.params.orderId,  },
//       {
//         $set: {
//           "project_tracking.$[]": 

//         },
//       }

//     );

//     res.status(200).send("Order has been confirmed.");
//   } catch (err) {
//     next(err);
//   }
// }



export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};
