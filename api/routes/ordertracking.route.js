import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrderUpdates, createOrderUpdate, modifyOrderUpdateComplete,deleteOrderUpdates } from "../controllers/ordertracking.controller.js";

const router = express.Router();

router.get("/:orderId", verifyToken, getOrderUpdates);
router.post("/createOrderUpdate", verifyToken, createOrderUpdate);
router.put("/:updateId", verifyToken, modifyOrderUpdateComplete);
router.delete("/:orderId", verifyToken, deleteOrderUpdates);



export default router;