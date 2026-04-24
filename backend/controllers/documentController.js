import Document from "../models/Document.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import path from "path";
import { encrypt, decrypt } from "../utils/encryption.js";

// ─── Helper: safely delete a local temp file ──────────────────────────────────
const deleteTempFile = (filePath) => {
  try {
    // Resolve to absolute path to avoid CWD mismatch issues
    const absPath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);

    if (fs.existsSync(absPath)) {
      fs.unlinkSync(absPath);
      console.log(`🗑️  Temp file deleted: ${absPath}`);
    }
  } catch (err) {
    // Non-fatal — just log, don't crash the response
    console.warn(`⚠️  Could not delete temp file: ${filePath}`, err.message);
  }
};

// ═══════════════════════════════════════════════════════════════════
// POST /api/documents  — Upload a document
// ═══════════════════════════════════════════════════════════════════
export const addDocument = async (req, res) => {
  let filePath = null;

  try {
    // ── 1. Validate file ─────────────────────────────────────────────
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded. Please attach a file." });
    }

    filePath = req.file.path; // absolute path set by multer diskStorage
    console.log("📁 Received file:", req.file.originalname, "| MIME:", req.file.mimetype);

    // ── 2. Validate body fields ──────────────────────────────────────
    const { title, category } = req.body;

    if (!title || !title.trim()) {
      deleteTempFile(filePath);
      return res.status(400).json({ message: "Document title is required." });
    }

    if (!category || !category.trim()) {
      deleteTempFile(filePath);
      return res.status(400).json({ message: "Document category is required." });
    }

    // ── 3. Validate user from auth middleware ─────────────────────────
    if (!req.user || !req.user._id) {
      deleteTempFile(filePath);
      return res.status(401).json({ message: "Unauthorized. User not found in request." });
    }

    // ── 4. Upload to Cloudinary ───────────────────────────────────────
    console.log("☁️  Uploading to Cloudinary...");

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",              // handles pdf, image, video
      folder: "lastkey/documents",        // organise in Cloudinary dashboard
      use_filename: true,
      unique_filename: true,
    });

    console.log("✅ Cloudinary upload success:", result.public_id);

    // ── 5. Encrypt sensitive fields before saving ─────────────────────
    const encryptedTitle    = encrypt(title.trim());
    const encryptedCategory = encrypt(category.trim());

    // ── 6. Save to MongoDB ────────────────────────────────────────────
    const document = await Document.create({
      user:        req.user._id,
      title:       encryptedTitle,
      category:    encryptedCategory,
      fileUrl:     result.secure_url,
      publicId:    result.public_id,
      fileType:    req.file.mimetype,
      isEncrypted: true,
    });

    console.log("💾 Document saved to DB:", document._id);

    // ── 7. Delete temp local file ─────────────────────────────────────
    deleteTempFile(filePath);

    // ── 8. Return decrypted version to client ─────────────────────────
    return res.status(201).json({
      _id:         document._id,
      user:        document.user,
      title:       title.trim(),         // plain text for immediate UI use
      category:    category.trim(),
      fileUrl:     document.fileUrl,
      publicId:    document.publicId,
      fileType:    document.fileType,
      isEncrypted: document.isEncrypted,
      createdAt:   document.createdAt,
    });

  } catch (error) {
    // Clean up temp file on any error
    if (filePath) deleteTempFile(filePath);

    console.error("❌ addDocument error:", error);

    // Mongoose validation error
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    // Cloudinary error
    if (error.http_code) {
      return res.status(502).json({
        message: `Cloudinary error: ${error.message}. Check your Cloudinary credentials in .env`,
      });
    }

    return res.status(500).json({ message: error.message || "Server error during upload" });
  }
};

// ═══════════════════════════════════════════════════════════════════
// GET /api/documents  — Get all documents for logged-in user
// ═══════════════════════════════════════════════════════════════════
export const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ user: req.user._id }).sort({ createdAt: -1 });

    // ✅ Use .toObject() (Mongoose v9 compatible) — NOT ._doc
    const decrypted = docs.map((doc) => {
      const obj = doc.toObject();
      return {
        ...obj,
        title:    decrypt(obj.title),
        category: decrypt(obj.category),
      };
    });

    return res.json(decrypted);

  } catch (error) {
    console.error("❌ getDocuments error:", error);
    return res.status(500).json({ message: error.message || "Failed to fetch documents" });
  }
};

// ═══════════════════════════════════════════════════════════════════
// DELETE /api/documents/:id  — Delete a document
// ═══════════════════════════════════════════════════════════════════
export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // ✅ Ownership check — only the owner can delete
    if (doc.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this document" });
    }

    // ✅ Delete from Cloudinary
    if (doc.publicId) {
      try {
        await cloudinary.uploader.destroy(doc.publicId, { resource_type: "auto" });
        console.log("☁️  Cloudinary asset deleted:", doc.publicId);
      } catch (cloudErr) {
        // Non-fatal — still delete from DB
        console.warn("⚠️  Cloudinary delete failed:", cloudErr.message);
      }
    }

    // ✅ Delete from MongoDB
    await doc.deleteOne();
    console.log("💾 Document removed from DB:", doc._id);

    return res.json({ message: "Document deleted successfully" });

  } catch (error) {
    console.error("❌ deleteDocument error:", error);
    return res.status(500).json({ message: error.message || "Failed to delete document" });
  }
};
