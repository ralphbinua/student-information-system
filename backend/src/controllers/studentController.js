import Student from "../models/student-information.js";

export async function createStudent(req, res) {
    try {
        const {name,studentId ,email, contact_number,home_address, department} = req.body;
        const newStudent = new Student({ name,studentId,email, contact_number,home_address, department});
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function getAllStudent(req, res) {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function getStudent(req, res) {
    try {
        const getStudentById = await Student.findById(req.params.id);
        if (!getStudentById) {
            return res.status(404).json({ message: "Student not found" });
        }else{
            res.status(200).json(getStudentById);
        }
    } catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function updateStudent(req, res) {
    try {
            const { name, email, contact_number,home_address } = req.body;
            const updatedStudent = await Student.findByIdAndUpdate(
                req.params.id,
                { name,email, contact_number,home_address, department},
                { new: true }
            );

            if (!updatedStudent) {
                return res.status(404).json({ message: "Student not found" });
            }else{
                res.status(200).json(updatedStudent);
            }
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function deleteStudent(req, res) {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }else{
            res.status(200).json({ message: "Student deleted successfully" });
        }
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}