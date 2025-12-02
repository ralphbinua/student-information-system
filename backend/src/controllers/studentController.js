import Student from "../models/student-information.js";
import StudentIdGenerator from "../utils/studentIdGenerator.js";

// done http response
export async function createStudent(req, res) {
    try {
        const {name,email} = req.body;
        const newStudent = new Student({ name,studentId: StudentIdGenerator(),email});
        const savedStudent = await newStudent.save();
        res.status(201).json({ message: "New Student created", student: savedStudent});
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// done http response
export async function getAllStudent(req, res) {
    try {
        const students = await Student.find();
        res.status(200).json({message :"Successful getting all students", students});
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// find student by custom studentId
// done http response
export async function getStudent(req, res) {
    try {
        const targetStudentId = req.params.id;
        const getStudentByCustomId = await Student.findOne({ studentId: targetStudentId });

        if (!getStudentByCustomId) {
            return res.status(404).json({ message: "Student not found" });
        } else {
            res.status(200).json({message: "Successfull getting student by studentId", getStudentByCustomId});
        }
    } catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// update student by custom studentId
// done http response
export async function updateStudent(req, res) {
    try {
            const { name,email } = req.body;

            const targetStudentId = req.params.id;
            const updatedStudent = await Student.findOneAndUpdate(
                { studentId: targetStudentId },
                { name,email},
                { new: true, runValidators: true }
            );

            if (!updatedStudent) {
                return res.status(404).json({ message: "Student not found" });
            }else{
                res.status(200).json({message: "Successfull updating student", updatedStudent});
            }
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// delete student by custom studentId
// done http response
export async function deleteStudent(req, res) {
    try {
        const targetStudentId = req.params.id;
        const deletedStudent = await Student.findOneAndDelete({ studentId: targetStudentId });
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

// done http response
export async function getStudentGrades(req, res) {
    try {
        const targetStudentId = req.params.id;

        const pipeline = [
            // Find the specific student
            { $match: { studentId: targetStudentId } },

            // Deconstruct the coursesEnrolled array
            { $unwind: "$coursesEnrolled" },

            // Join with the CourseInformation collection
            {
                $lookup: {
                    from: "courseinformations", // The actual name of courses collection
                    localField: "coursesEnrolled.courseCode", // Field in Student document
                    foreignField: "courseCode",   // Field in Course document
                    as: "courseDetails"
                }
            },

            //  Deconstruct the courseDetails array
            { $unwind: { path: "$courseDetails", preserveNullAndEmptyArrays: true } },

            // Reconstruct the student document and create the 'enrollments'
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    email: { $first: "$email" },
                    createdAt: { $first: "$createdAt" },

                    enrollments: {
                        // allow multiple entries if the student took the course twice
                        $push: {
                            // Extract course details from the joined 'courseDetails'
                            courseName: "$courseDetails.title", // show course name
                            units: "$courseDetails.units", // show course units
                            grade: { $arrayElemAt: ["$coursesEnrolled.grades", 0] } // show grades
                        }
                    }
                }
            },

            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    name: 1,
                    email: 1,
                    createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    enrollments: 1
                }
            }
        ];

        const [studentData] = await Student.aggregate(pipeline);

        if (!studentData) {
            return res.status(404).json({ message: `Student with ID ${targetStudentId} not found.` });
        }

        res.status(200).json({message:"Successfull fetching student grades", studentData});

    } catch (error) {
        console.error("Error fetching student grades:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}