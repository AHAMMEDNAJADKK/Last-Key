import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import documentRoutes from "./routes/documentRoutes.js"

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes)
app.use("/api/documents",documentRoutes);

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