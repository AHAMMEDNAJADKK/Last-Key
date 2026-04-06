import express from "express";
import { addNominee, getNominees } from "../controllers/nomineeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { nomineeLogin } from "../controllers/nomineeController.js";
import { uploadDeathCertificate,getNomineeDocuments } from "../controllers/nomineeController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/login", nomineeLogin);

// ➕ Add nominee (only logged user)
router.post("/", protect, addNominee);

router.post(
  "/upload-certificate",
  protect,
  upload.single("file"),
  uploadDeathCertificate,
);

router.get("/", protect, getNominees);
router.get("/documents",protect,getNomineeDocuments)

export default router;
