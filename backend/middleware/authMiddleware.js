import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Nominee from "../models/Nominee.js";

// ================= GENERIC PROTECT =================
export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user (from DB)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    req.role = decoded.role; // ✅ from token

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
    req.role = "nominee";

    next();

  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

// ================= ROLE CHECK (🔥 IMPORTANT) =================
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};