import express from 'express';
import {createJob, deleteCreatedJob, updateCreatedJob} from '../controllers/jobController';
import  { createProject, updateProject, deleteProject}from '../controllers/project';
import uploadOptions from '../middlewares/imageUpload';
import {projectValidatior} from "../middlewares/projectMiddleware"
import protect from '../middlewares/protectRoute'
const router = express.Router();

/* GET home page. */

router.post("/projects",  projectValidatior, protect, createProject)
router.put("/projects/:id", projectValidatior, protect, updateProject)
router.delete("/projects/:id",protect,  deleteProject);
router.post('/create_jobs', uploadOptions.single('image'),protect, createJob);
router.put('/update_jobs/:id', uploadOptions.single('image'),protect, updateCreatedJob);
router.delete('/delete_jobs/:id', protect, deleteCreatedJob);


export default router;
