import express from 'express';
import test, { createProject, updateProject, deleteProject}from '../controllers';
import {projectValidatior} from "../middlewares/projectMiddleware"
const router = express.Router();

/* GET home page. */
router.get('/test', test);
router.post("/projects", projectValidatior, createProject)
router.put("/projects/:id", projectValidatior, updateProject)
router.delete("/projects/:id", deleteProject);


export default router;
