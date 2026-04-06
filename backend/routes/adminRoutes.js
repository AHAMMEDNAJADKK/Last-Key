import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { getDashboard } from "../controllers/adminController.js";

const router = express.Router();

// 🔒 SECURE ROUTE
router.get("/dashboard", protect, adminOnly, getDashboard);

export default router;