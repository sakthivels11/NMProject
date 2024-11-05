import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createOrder, getOrders, getAllOrders, deleteOrder, intent, confirm, modifyOrderCompletion } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.get("/getallOrders", verifyToken, getAllOrders);
router.put("/ordercomplete/:orderId", verifyToken, modifyOrderCompletion);
router.delete("/deleteOrder/:id", verifyToken, deleteOrder);
// router.get("/:orderId", verifyToken, getSingleOrder);
// router.post("/orderProgressUpdate/:orderId", verifyToken, orderProjectTracking);
// router.put("/orderProgressUpdate/:index", verifyToken, orderProjectTrackingModify);
// router.post("/create-payment-intent/:id", verifyToken, intent);
// router.put("/", verifyToken, confirm);

export default router;
