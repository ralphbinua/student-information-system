import Grade from '../models/grade-information.js';

export async function createGrade(req, res) {
    try {
        const {courseCode, title, grade} = req.body;
        const newGrade = new Grade({ courseCode, title, grade});
        const savedGrade = await newGrade.save();
        res.status(201).json(savedGrade);
    } catch (error) {
        console.error("Error creating Grade:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function getAllGrade(req, res) {
    try {
        const Grades = await Grade.find();
        res.status(200).json(Grades);
    } catch (error) {
        console.error("Error fetching Grades:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function updateGrade(req, res) {
    try {
            const {courseCode, title, grade } = req.body;
            const updatedGrade = await Grade.findByIdAndUpdate(
                req.params.id,
                { courseCode, title, grade},
                { new: true }
            );

            if (!updatedGrade) {
                return res.status(404).json({ message: "Grade not found" });
            }else{
                res.status(200).json(updatedGrade);
            }
    } catch (error) {
        console.error("Error updating Grade:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}