import Document from "../models/Document.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import path from "path";
import { encrypt, decrypt } from "../utils/encryption.js";

// ─── Helper: safely delete a local temp file ──────────────────────────────────
const deleteTempFile = (filePath) => {
  if (!filePath) return;
  try {
    const absPath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);

    if (fs.existsSync(absPath)) {
      fs.unlinkSync(absPath);
      console.log(`🗑️  Temp file deleted: ${absPath}`);
    } else {
      console.log(`ℹ️  Temp file already gone or not found: ${absPath}`);
    }
  } catch (err) {
    console.warn(`⚠️  Could not delete temp file: ${filePath}`, err.message);
  }
};

// ═══════════════════════════════════════════════════════════════════
// POST /api/documents  — Upload a document
// ═══════════════════════════════════════════════════════════════════
export const addDocument = async (req, res) => {
  let filePath = null;
  let cloudinaryPublicId = null;

  try {
    // ── 1. DEBUG LOGS ──────────────────────────────────
    console.log("--- [DEBUG] UPLOAD FLOW START ---");
    console.log("1. req.file:", req.file ? `RECEIVED (${req.file.originalname})` : "MISSING");
    console.log("2. req.body:", req.body);
    console.log("3. req.user:", req.user?._id);

    // ── 2. Validate file ─────────────────────────────────────────────
    if (!req.file) {
      console.error("❌ ERROR: No file found in req.file.");
      return res.status(400).json({ 
        message: "Upload failed", 
        error: "No file received by server. Please select a file and try again." 
      });
    }

    filePath = req.file.path;

    // Check if file actually exists on disk
    if (!fs.existsSync(filePath)) {
      console.error("❌ ERROR: Temp file not found at path:", filePath);
      return res.status(500).json({ 
        message: "Upload failed", 
        error: "Internal server error: Temporary file was lost." 
      });
    }

    // ── 3. Validate body fields ──────────────────────────────────────
    const { title, category } = req.body;

    if (!title || !title.trim()) {
      deleteTempFile(filePath);
      return res.status(400).json({ message: "Upload failed", error: "Document title is required." });
    }

    if (!category || !category.trim()) {
      deleteTempFile(filePath);
      return res.status(400).json({ message: "Upload failed", error: "Document category is required." });
    }

    // ── 4. Validate user ─────────────────────────────────────────────
    if (!req.user || !req.user._id) {
      deleteTempFile(filePath);
      return res.status(401).json({ message: "Upload failed", error: "Unauthorized. Please log in again." });
    }

    // ── 5. Upload to Cloudinary ───────────────────────────────────────
    console.log("4. ☁️  Uploading to Cloudinary...");
    let cloudinaryResult;
    try {
      cloudinaryResult = await cloudinary.uploader.upload(filePath, {
        resource_type: "auto",
        folder: "lastkey/documents",
        use_filename: true,
        unique_filename: true,
      });
      cloudinaryPublicId = cloudinaryResult.public_id;
      console.log("5. ✅ Cloudinary Success. PublicID:", cloudinaryPublicId);
    } catch (cloudErr) {
      console.error("❌ Cloudinary API Error:", cloudErr.message || cloudErr);
      deleteTempFile(filePath);
      
      let errorMsg = cloudErr.message || "Cloudinary service error";
      if (errorMsg.includes("403")) {
        errorMsg = "Cloudinary Access Denied (403). Check API Key/Secret and Cloud Name.";
      }

      return res.status(500).json({
        message: "Upload failed",
        error: errorMsg
      });
    }

    // ── 6. Encrypt sensitive fields ───────────────────────────────────
    console.log("6. 🔐 Encrypting metadata...");
    let encryptedTitle, encryptedCategory;
    try {
      encryptedTitle    = encrypt(title.trim());
      encryptedCategory = encrypt(category.trim());
    } catch (encErr) {
      console.error("❌ Encryption Error:", encErr.message);
      // Cleanup Cloudinary since DB save hasn't happened yet
      await cloudinary.uploader.destroy(cloudinaryPublicId);
      deleteTempFile(filePath);
      return res.status(500).json({ message: "Upload failed", error: "Encryption error." });
    }

    // ── 7. Save to MongoDB ────────────────────────────────────────────
    console.log("7. 💾 Saving to MongoDB...");
    try {
      const newDoc = await Document.create({
        user:        req.user._id,
        title:       encryptedTitle,
        category:    encryptedCategory,
        fileUrl:     cloudinaryResult.secure_url,
        publicId:    cloudinaryPublicId,
        fileType:    req.file.mimetype,
        isEncrypted: true,
      });

      console.log("8. ✅ Saved Doc ID:", newDoc._id);

      // ── 8. Success Response ────────────────────────────────
      deleteTempFile(filePath);
      return res.status(201).json({
        message: "Document uploaded successfully",
        document: {
          _id:      newDoc._id,
          title:    title.trim(),
          category: category.trim(),
          fileUrl:  newDoc.fileUrl,
          fileType: newDoc.fileType
        }
      });
    } catch (dbErr) {
      console.error("❌ MongoDB Save Error:", dbErr.message);
      // ROLLBACK: Delete from Cloudinary if DB save fails
      await cloudinary.uploader.destroy(cloudinaryPublicId);
      deleteTempFile(filePath);
      return res.status(500).json({ message: "Upload failed", error: "Database save error." });
    }

  } catch (error) {
    if (filePath) deleteTempFile(filePath);
    if (cloudinaryPublicId) await cloudinary.uploader.destroy(cloudinaryPublicId).catch(() => {});
    
    console.error("❌ --- UNEXPECTED ERROR ---");
    console.error(error);

    return res.status(500).json({
      message: "Server error during upload",
      error: error.message
    });
  }
};



// ═══════════════════════════════════════════════════════════════════
// GET /api/documents  — Get all documents for user
// ═══════════════════════════════════════════════════════════════════
export const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ user: req.user._id }).sort({ createdAt: -1 });

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
    return res.status(500).json({ message: "Failed to fetch documents", error: error.message });
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

    if (doc.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (doc.publicId) {
      await cloudinary.uploader.destroy(doc.publicId, { resource_type: "auto" });
    }

    await doc.deleteOne();
    return res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("❌ deleteDocument error:", error);
    return res.status(500).json({ message: "Failed to delete document", error: error.message });
  }
};
