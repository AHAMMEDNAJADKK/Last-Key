import express from "express";
import { addNominee, getNominees, nomineeLogin, getNomineeDocuments } from "../controllers/nomineeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", nomineeLogin);

// ➕ Add nominee (only logged user)
router.post("/", protect, addNominee);

router.get("/", protect, getNominees);
router.get("/documents",protect,getNomineeDocuments)

export default router;
