import express from "express";
import studentRoutes from "./routes/studentRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

connectDB();  // connect to db

app.use(express.json()); // middleware to parse JSON

app.use("/api/students", studentRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT)
})
