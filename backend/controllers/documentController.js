import Document from "../models/Document.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { encrypt } from "../utils/encryption.js";
import { decrypt } from "../utils/encryption.js";

// ================= ADD DOCUMENT =================
export const addDocument = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    const filePath = req.file.path;

    // ✅ upload to cloudinary (supports all types)
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // ✅ save to DB
    const document = await Document.create({
      user: req.user._id,
      title: encrypt(title),
      category: encrypt(category),
      fileUrl: result.secure_url,
      publicId: result.public_id,
      fileType: req.file.mimetype, // ✅ FIXED
    });

    // ✅ delete local file safely
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET DOCUMENTS =================
export const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    // 🔓 decrypt before sending
    const decryptedDocs = docs.map((doc) => ({
      ...doc._doc,
      title: decrypt(doc.title),
      category: decrypt(doc.category),
    }));

    res.json(decryptedDocs);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE DOCUMENT =================
export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // ✅ delete from cloudinary
    if (doc.publicId) {
      await cloudinary.uploader.destroy(doc.publicId, {
        resource_type: "auto",
      });
    }

    // ✅ delete from DB
    await doc.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
