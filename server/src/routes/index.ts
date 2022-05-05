import express from 'express';
import  { createProject, updateProject, deleteProject}from '../controllers/project';
import {projectValidatior} from "../middlewares/projectMiddleware"
const router = express.Router();

/* GET home page. */

router.post("/projects", projectValidatior, createProject)
router.put("/projects/:id", projectValidatior, updateProject)
router.delete("/projects/:id", deleteProject);


export default router;
