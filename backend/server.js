import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import documentRoutes from "./routes/documentRoutes.js"
import nomineeRoutes from "./routes/nomineeRoutes.js"
import verificationRoutes from "./routes/verificationRoutes.js"


dotenv.config();

const app = express();


app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes)
app.use("/api/documents",documentRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/nominee",nomineeRoutes);
app.use("/api/verification",verificationRoutes)

// connect DB
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("LastKey API Running 🚀");
});

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});