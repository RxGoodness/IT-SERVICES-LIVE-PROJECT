import express from 'express';
import { createJob, deleteCreatedJob, updateCreatedJob, getAllJobs } from '../controllers/jobController';
import uploadOptions from '../middlewares/imageUpload';
import { projectValidatior } from "../middlewares/projectMiddleware"
import { createProject, updateProject, deleteProject } from '../controllers/project';
const router = express.Router();

/* GET home page. */
router.post("/projects", projectValidatior, createProject)
router.put("/projects/:id", projectValidatior, updateProject)
router.delete("/projects/:id", deleteProject);
router.post('/create_jobs', uploadOptions.single('image'), createJob);
router.put('/update_jobs/:id', uploadOptions.single('image'), updateCreatedJob);
router.delete('/delete_jobs/:id', deleteCreatedJob);
router.get("/jobs", getAllJobs)


export default router;
