import Student from "../models/studentModel.js";

export async function createStudent(req, res) {
    try {
        const { firstName, lastName, email, dateofBirth, age } = req.body;
        const newStudent = new Student({ firstName, lastName, email, dateofBirth, age });
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}