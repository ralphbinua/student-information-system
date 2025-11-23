import express from "express";

import {createGrade, getAllGrade, updateGrade} from "../controllers/gradeController.js";

const router = express.Router();

router.get("/", getAllGrade)
router.put("/:id", updateGrade)
router.post("/", createGrade);

export default router;