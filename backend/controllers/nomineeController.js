import Nominee from "../models/Nominee.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
// 🔐 GENERATE TOKEN
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ================= ADD NOMINEE =================
export const addNominee = async (req, res) => {
  try {
    const { name, email, password, relation } = req.body;

    const exists = await Nominee.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Nominee already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nominee = await Nominee.create({
      name,
      email,
      password: hashedPassword,
      relation,
      user: req.user._id,
    });

    res.status(201).json({
      _id: nominee._id,
      name: nominee.name,
      email: nominee.email,
      relation: nominee.relation,
      message: "Nominee added successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET NOMINEES =================
export const getNominees = async (req, res) => {
  try {
    const nominees = await Nominee.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(nominees);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= NOMINEE LOGIN =================
export const nomineeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const nominee = await Nominee.findOne({ email });

    if (nominee && (await bcrypt.compare(password, nominee.password))) {
      res.json({
        _id: nominee._id,
        name: nominee.name,
        email: nominee.email,
        role: "nominee",
        token: generateToken(nominee._id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPLOAD DEATH CERTIFICATE =================
export const uploadDeathCertificate = async (req, res) => {
  try {
    const nomineeId = req.user._id;

    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    // upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const nominee = await Nominee.findByIdAndUpdate(
      nomineeId,
      {
        deathCertificate: result.secure_url,
        verificationStatus: "pending",
      },
      { new: true }
    );

    // delete local file
    fs.unlinkSync(req.file.path);

    res.json({
      message: "Certificate uploaded, waiting for admin approval",
      nominee,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNomineeDocuments = async (req, res) => {
  try {
    // nominee login user
    const nominee = req.user;

    if (nominee.role !== "nominee") {
      return res.status(403).json({ message: "Not authorized" });
    }

    // check verification
    if (nominee.verificationStatus !== "approved") {
      return res.status(403).json({
        message: "Access not approved yet",
      });
    }
    // get documents of linked user
    const documents = await Document.find({
      user: nominee.user,
    }).sort({ createdAt: -1 });

    res.json(documents);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};