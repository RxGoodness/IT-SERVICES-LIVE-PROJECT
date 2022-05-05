import express from 'express';
import test, { createProject, updateProject, deleteProject}from '../controllers';
const router = express.Router();

/* GET home page. */
router.get('/test', test);
router.post("/projects",createProject)
router.put("/projects/:id", updateProject)
router.delete("/projects/:id", deleteProject);


export default router;
