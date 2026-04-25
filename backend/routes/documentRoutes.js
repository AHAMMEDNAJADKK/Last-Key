import express from "express";
import {
  addDocument,
  getDocuments,
  deleteDocument,
} from "../controllers/documentController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/**
 * @desc  Custom middleware to handle multer errors before they hit the controller
 */
const uploadSingleFile = (req, res, next) => {
  // Use field name "file"
  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File too large. Max 10MB allowed." });
      }
      return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

// Use simple "upload.single('file')" if we trust express global error handler,
// but let's provide a robust version here.

import multer from "multer"; // Needed for instance check

router.post("/", protect, (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, addDocument);

router.get("/", protect, getDocuments);
router.delete("/:id", protect, deleteDocument);

export default router;