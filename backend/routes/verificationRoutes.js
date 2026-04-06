import express from "express";
import { uploadCertificate } from "../controllers/verificationController.js";
import { protectNominee } from "../middleware/authMiddleware.js";
import { getAllVerifications,updateVerificationStatus,getMyVerificationStatus } from "../controllers/verificationController.js";
import {protectAdmin} from "../middleware/authMiddleware.js"

const router = express.Router();

router.post(
  "/upload",
  protectNominee,
  upload.single("file"),
  uploadCertificate
);

router.get("/admin",protectAdmin,getAllVerifications)
router.put("/admin/:id",protectAdmin,updateVerificationStatus);
router.get("/status",protectNominee,getMyVerificationStatus);
export default router;