import express from "express";
import {
  addDocument,
  getDocuments,
  deleteDocument,
} from "../controllers/documentController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", protect, upload.single("file"), addDocument);
router.get("/", protect, getDocuments);
router.delete("/:id", protect, deleteDocument);

export default router;