import express from "express";
const router = express.Router();
import { projectValidatior } from "../middlewares/projectMiddleware";
import upload from "../middlewares/process.image";

import {
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project";

import protect from "../middlewares/protectRoute";

router.post(
  "/",
  protect,
  upload.single("featuredImage"),
  projectValidatior,
  createProject
);
router.put(
  "/:id",
  protect,
  upload.single("featuredImage"),
  projectValidatior,
  updateProject
);
router.delete("/:id", protect, deleteProject);

export default router;
