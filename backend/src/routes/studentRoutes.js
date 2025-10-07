import express from "express";
import {createStudent, getAllStudent, updateStudent, deleteStudent,getStudent} from "../controllers/studentController.js";

const router = express.Router();

router.post("/", createStudent);
router.get("/", getAllStudent)
router.put("/:id", updateStudent)
router.delete("/:id", deleteStudent);
router.get("/:id", getStudent);
export default router;