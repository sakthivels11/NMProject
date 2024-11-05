import express from "express";
import { getGigCategories } from "../controllers/gigcategories.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", getGigCategories);

export default router;