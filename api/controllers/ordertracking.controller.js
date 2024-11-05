import OrderUpdates from "../models/orderupdates.model.js"

export const createOrderUpdate = async (req, res, next) => {
  try {
    const newOrderUpdate = new OrderUpdates({
      orderId: req.body.id,
      title: req.body.title,
      desc: req.body.desc,
      complete: false,
    });
    await newOrderUpdate.save()

    console.log("Hello from Creating OrderUpdates Controller")
    res.status(200).send("Successfully Added OrderUpdate to Database")
  } catch (error) {
    console.log("Error in OrderUpdate creation")
    next(error);
  }
};



export const getOrderUpdates = async (req, res, next) => {
  try {
    const orderupdates = await OrderUpdates.find({ orderId: req.params.orderId });
    console.log("Order Updates: ", orderupdates);
    res.status(200).send(orderupdates);
  }
  catch (err) {
    next(err);
  }
}




export const modifyOrderUpdateComplete = async (req, res, next) => {
  try {
    const updatedConversation = await OrderUpdates.findOneAndUpdate(
      { _id: req.params.updateId },
      {
        $set: {
          "complete": true
        },
      },
    )
    console.log("Order Update Modified Successfully");
    res.status(200).send(updatedConversation);
  } catch (error) {
    console.log("Error in OrderUpdateComplete Modification")
    next(error);
  }
}

export const deleteOrderUpdates = async (req, res, next) => {
  try {
    const orderUpdates = await OrderUpdates.deleteMany(
      { orderId: req.params.orderId },
    )
    console.log("OrderUpdates Deleted Successfully");
    res.status(200).send(orderUpdates);
  } catch (error) {
    console.log("Error in OrderUpdate Deletion")
    next(error);
  }
}
