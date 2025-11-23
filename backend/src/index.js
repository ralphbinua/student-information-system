import express from "express";

import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import gradeRoutes from "./routes/gradeRoutes.js";

import { connectDB } from "./config/db.js";

import dotenv from "dotenv";

import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

connectDB();  // connect to db

app.use(cors({
  origin: 'http://localhost:5173', // allow requests from this origin
})); // enable CORS for all routes
app.use(express.json()); // middleware to parse JSON
app.use(rateLimiter) // middleware to parse JSON

app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/grades", gradeRoutes)

app.listen(PORT, () => {
  console.log("Server is running on port", PORT)
})
