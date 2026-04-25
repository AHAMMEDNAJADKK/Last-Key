import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Ensure uploads folder exists (use absolute path)
const uploadDir = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Sanitize and append timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

// ✅ File filter
const fileFilter = (req, file, cb) => {
  console.log(`--- [MULTER] Checking file: ${file.originalname} (${file.mimetype}) ---`);
  
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
    console.warn(`❌ [MULTER] Rejected file type: ${file.mimetype}`);
    cb(new Error(`File type '${file.mimetype}' not supported. Use PDF, JPG, PNG, or WEBP.`), false);
  }
};


// ✅ Multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

export default upload;