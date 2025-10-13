import mongoose from "mongoose";

const studentInformationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    contact_number: { type: String, required: true },
    home_address: { type: String, required: true },
    department: { type: String, required: true },
  },
  { timestamps: true }
);

const StudentInformation = mongoose.model(
  "studentInformation",
  studentInformationSchema
);

export default StudentInformation;
