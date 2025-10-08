import express from "express";
import {createStudent, getAllStudent, updateStudent, deleteStudent,getStudent} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getAllStudent)
router.get("/:id", getStudent);
router.put("/:id", updateStudent)
router.post("/", createStudent);
router.delete("/:id", deleteStudent);

export default router;