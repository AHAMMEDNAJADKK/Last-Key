import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  uploadCertificate,
  getMyVerificationStatus,
  getAllVerifications,
  updateVerificationStatus,
} from "../controllers/verificationController.js";

import {
  protect,
  protectNominee,
  authorizeRoles,
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
router.get("/all", protect, authorizeRoles("admin"), getAllVerifications);

router.put(
  "/update/:id",
  protect,
  authorizeRoles("admin"),
  updateVerificationStatus
);

export default router;