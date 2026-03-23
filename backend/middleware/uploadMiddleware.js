import multer from "multer";
import path from "path";

// storage config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

// file filter (optional)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF & Images allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;