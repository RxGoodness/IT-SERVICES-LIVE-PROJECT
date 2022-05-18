import express from "express";
const router = express.Router();
import { projectValidatior } from "../middlewares/projectMiddleware";
import {
  createProject,
  updateProject,
  deleteProject,
  getAllProject,
  getSingleProject,
} from "../controllers/project";

import protect from "../middlewares/protectRoute";
router.post("/", projectValidatior, protect, createProject);
router.put("/:id", projectValidatior, protect, updateProject);
router.delete("/:id", protect, deleteProject);
router.get("/", protect, getAllProject)
router.get("/:id", protect, getSingleProject)

export default router;
