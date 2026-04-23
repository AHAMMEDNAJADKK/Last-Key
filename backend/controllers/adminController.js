import User from "../models/User.js";
import Nominee from "../models/Nominee.js";
import Document from "../models/Document.js";
import Verification from "../models/Verification.js";

// ================= GET DASHBOARD STATS =================
export const getDashboard = async (req, res) => {
  try {
    const userCount = await User.countDocuments({ role: "user" });
    const nomineeCount = await Nominee.countDocuments();
    const documentCount = await Document.countDocuments();
    const pendingVerifications = await Verification.countDocuments({ status: "pending" });

    res.json({
      stats: {
        users: userCount,
        nominees: nomineeCount,
        documents: documentCount,
        pendingVerifications,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
