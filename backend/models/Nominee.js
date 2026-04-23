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
  },
  { timestamps: true },
);

export default mongoose.model("Nominee", nomineeSchema);
