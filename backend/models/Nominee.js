import mongoose from "mongoose";

const nomineeSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    required: true,
  },

  password: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  relation: String,

  deathCertificate: String,

  status: {
    type: String,
    enum: ["none", "pending", "approved", "rejected"],
    default: "none",
  },

}, { timestamps: true });

export default mongoose.model("Nominee", nomineeSchema);