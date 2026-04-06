import express from "express";
import upload from "../middleware/upload.js";

import {
  uploadCertificate,
  getMyVerificationStatus,
  getAllVerifications,
  updateVerificationStatus,
} from "../controllers/verificationController.js";

import {
  protectNominee,
  protectAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// nominee
router.post(
  "/upload",
  protectNominee,
  upload.single("file"),
  uploadCertificate
);

router.get("/status", protectNominee, getMyVerificationStatus);

// admin
router.get("/all", protectAdmin, getAllVerifications);
router.put("/update/:id", protectAdmin, updateVerificationStatus);

export default router;
