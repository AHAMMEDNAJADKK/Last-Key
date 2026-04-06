import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  title: String,

  category: String,

  fileUrl: String,
  
  publicId:{
    type:String,
    required:true,
  },
  
  fileType: String,

  isEncrypted: {
    type: Boolean,
    default: true,
  },

}, { timestamps: true });
export default mongoose.model("Document", documentSchema);