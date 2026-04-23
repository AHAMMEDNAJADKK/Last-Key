import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { getDashboard } from "../controllers/adminController.js";

const router = express.Router();

// 🔒 SECURE ROUTE
router.get("/dashboard", protect, authorizeRoles("admin"), getDashboard);

export default router;