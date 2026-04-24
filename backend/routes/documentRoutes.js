import express from "express";
import {
  addDocument,
  getDocuments,
  deleteDocument,
} from "../controllers/documentController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ─── Multer error wrapper ────────────────────────────────────────────────────
// Multer throws errors (file too large, wrong type) OUTSIDE the controller's
// try/catch. This wrapper converts multer errors into proper JSON 400 responses
// instead of crashing with a 500.
const handleUpload = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      // MulterError (file size, unexpected field, etc.)
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File too large. Maximum size is 10MB." });
      }
      // fileFilter rejection or other multer error
      return res.status(400).json({ message: err.message || "File upload error" });
    }
    next();
  });
};

// ─── Routes ──────────────────────────────────────────────────────────────────

// POST /api/documents   — upload a new document
router.post("/", protect, handleUpload, addDocument);

// GET /api/documents    — get all documents for logged-in user
router.get("/", protect, getDocuments);

// DELETE /api/documents/:id  — delete a document by ID
router.delete("/:id", protect, deleteDocument);

export default router;