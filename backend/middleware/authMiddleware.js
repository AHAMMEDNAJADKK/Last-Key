import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Nominee from "../models/Nominee.js";

// ================= USER PROTECT =================
export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();

  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

// ================= NOMINEE PROTECT =================
export const protectNominee = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const nominee = await Nominee.findById(decoded.id);

    if (!nominee) {
      return res.status(401).json({ message: "Not nominee" });
    }

    req.user = nominee;
    next();

  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

// ================= ADMIN PROTECT =================
export const protectAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};