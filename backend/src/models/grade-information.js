import mongoose from "mongoose";

const gradeInformation = new mongoose.Schema(
  {
    courseCode: { type: String, required: true },
    title: { type: String, required: true },
    grade: { type: String, required: true },
  },
  { timestamps: true }
);

const GradeInformation = mongoose.model(
  "gradeInformation",
  gradeInformation
);

export default GradeInformation;
