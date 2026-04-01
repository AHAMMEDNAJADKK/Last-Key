import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { logoutUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",logoutUser)

export default router;