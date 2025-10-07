import mongoose from 'mongoose';

const studentInformationSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    middleName: { type: String, required: true },
    age:{ type: Number, required: true },
},
{ timestamps: true }
);

const StudentInformation = mongoose.model('StudentInformation', studentInformationSchema);

export default StudentInformation;