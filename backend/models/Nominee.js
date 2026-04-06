import mongoose from "mongoose";

const nomineeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      relation: String,
      required: true,
    },

    relation: {
      type: String,
      required: true,
    },

    // 🔗 Link to User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deathCertificate: String,
    verificationStatus: {
      type: String,
      enum: ["none", "pending", "approved", "rejected"],
      default: "none",
    },

    // 🔐 Verification status
    isVerified: {
      type: String,
      enum: ["false", "pending", "approved"],
      default: "false",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Nominee", nomineeSchema);
