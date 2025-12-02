import Student from "../models/student-information.js";

// done http response
export async function enrollStudent(req, res) {
    try {
        const { studentId, courseCode } = req.body;

        if (!studentId || !courseCode) {
            return res.status(400).json({ message: "Missing studentId or courseCode in request body" });
        }

        // Check if the student is already enrolled in the course
        const existingEnrollment = await Student.findOne({
            studentId: studentId,
            "coursesEnrolled.courseCode": courseCode
        });

        if (existingEnrollment) {
            return res.status(409).json({ message: `Student ${studentId} is already enrolled in course ${courseCode}` });
        }

        // Adding the new course to the coursesEnrolled
        const updatedStudent = await Student.findOneAndUpdate(
            { studentId: studentId }, // Find the student by the studentId provided in the body
            {
                $push: {
                    coursesEnrolled: {
                        courseCode: courseCode,
                    }
                }
            },
            { new: true }
        );

        if (!updatedStudent) {
            // Check if the student exists
            return res.status(404).json({ message: `Student with ID ${studentId} not found` });
        }
        res.status(201).json({
            message: "Course enrolled successfully",
            student: updatedStudent
        });

    } catch (error) {
        console.error("Error enrolling student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// done http response
export async function gradeStudent(req, res) {
    try {
        const { studentId, courseCode, grade } = req.body;

        if (!studentId || !courseCode || grade === undefined) {
            return res.status(400).json({ message: "Missing studentId, courseCode, or grades" });
        }

        // Find the student and the specific course
        // Add the grades to the specific course
        const updatedStudent = await Student.findOneAndUpdate(
            {
                studentId: studentId,
                "coursesEnrolled.courseCode": courseCode // find the specific course
            },
            {
                $push: { "coursesEnrolled.$.grades": grade } // add grades
            },
            { new: true } // Return the updated document
        );

        if (!updatedStudent) {
            // if the student or the course enrollment is not found.
            return res.status(404).json({ message: `Enrollment for Student ${studentId} in Course ${courseCode} not found.` });
        }

        res.status(200).json({
            message: "Grade added successfully",
            student: updatedStudent
        });

    } catch (error) {
        console.error("Error adding grade:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}