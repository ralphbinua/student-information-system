import mongoose from "mongoose";

const courseInformationSchema = new mongoose.Schema(
  {
    courseCode: { type: String, required: true },
    title: { type: String, required: true },
    department: { type: String, required: true },
  },
  { timestamps: true }
);

const CourseInformation = mongoose.model(
  "courseInformation",
  courseInformationSchema
);

export default CourseInformation;
