import Course from '../models/course-information.js';

export async function createCourse(req, res) {
    try {
        const {courseCode, title, department} = req.body;
        const newCourse = new Course({ courseCode, title, department});
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function getAllCourse(req, res) {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function getCourse(req, res) {
    try {
        const getCourseById = await Course.findById(req.params.id);
        if (!getCourseById) {
            return res.status(404).json({ message: "Course not found" });
        }else{
            res.status(200).json(getCourseById);
        }
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function updateCourse(req, res) {
    try {
            const {courseCode, title, department } = req.body;
            const updatedCourse = await Course.findByIdAndUpdate(
                req.params.id,
                { courseCode, title, department},
                { new: true }
            );

            if (!updatedCourse) {
                return res.status(404).json({ message: "Course not found" });
            }else{
                res.status(200).json(updatedCourse);
            }
    } catch (error) {
        console.error("Error updating Course:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function deleteCourse(req, res) {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }else{
            res.status(200).json({ message: "Course deleted successfully" });
        }
    } catch (error) {
        console.error("Error deleting Course:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}