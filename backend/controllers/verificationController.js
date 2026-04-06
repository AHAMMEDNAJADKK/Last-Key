import Verification from "../models/Verification.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadCertificate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    const filePath = req.file.path;

    // upload to cloudinary
    const result = await cloudinary.uploader.upload(filePath);

    // save in DB
    const verification = await Verification.create({
      nominee: req.user._id,
      certificateUrl: result.secure_url,
      publicId: result.public_id,
      status: "pending",
    });

    // delete local file
    fs.unlinkSync(filePath);

    res.status(201).json({
      message: "Uploaded successfully",
      status: verification.status,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL (ADMIN) =================
export const getAllVerifications = async (req, res) => {
  try {
    const verifications = await Verification.find()
      .populate("nominee", "name email")
      .sort({ createdAt: -1 });

    res.json(verifications);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  



// ================= UPDATE STATUS =================
export const updateVerificationStatus = async (req, res) => {
  try {
    const { status } = req.body; // approved / rejected

    const verification = await Verification.findById(req.params.id);

    if (!verification) {
      return res.status(404).json({ message: "Not found" });
    }

    verification.status = status;
    await verification.save();

    res.json({ message: `Verification ${status}` });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET MY STATUS =================
export const getMyVerificationStatus = async (req, res) => {
  try {
    const verification = await Verification.findOne({
      nominee: req.user._id,
    });

    if (!verification) {
      return res.json({ status: "not_uploaded" });
    }

    res.json({
      status: verification.status,
      certificateUrl: verification.certificateUrl,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};