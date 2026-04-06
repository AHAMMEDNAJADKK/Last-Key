import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
  nominee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nominee",
    required: true,
  },
  certificateUrl: String,
  publicId: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.model("Verification", verificationSchema);