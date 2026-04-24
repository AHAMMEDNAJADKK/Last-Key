import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Ensure uploads folder exists (use absolute path to avoid CWD issues)
const uploadDir = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Disk storage — save temporarily before Cloudinary upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    // Sanitize original name + timestamp to avoid collisions
    const safeName = file.originalname.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.\-_]/g, "");
    const fileName = `${Date.now()}-${safeName}`;
    cb(null, fileName);
  },
});

// ✅ Strict file filter — only safe document types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // Pass error as first arg — multer will NOT save file and triggers error handler
    cb(new Error("Only PDF, JPG, PNG, WEBP files are allowed"), false);
  }
};

// ✅ 10MB limit (Cloudinary free tier supports up to 10MB for images, 100MB for video)
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

export default upload;