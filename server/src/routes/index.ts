import express from 'express';
import {createJob, deleteCreatedJob, updateCreatedJob} from '../controllers/jobController';
import  { createProject, updateProject, deleteProject}from '../controllers/project';
import {createService, deleteService, updateService} from '../controllers/service';
import { validateService } from '../middlewares/serviceMiddleware';


import uploadOptions from '../middlewares/imageUpload';
import {projectValidatior} from "../middlewares/projectMiddleware"
const router = express.Router();

/* GET home page. */

router.post('/services', uploadOptions.single('image'),validateService, createService)
router.put('/services/:id', uploadOptions.single('image'), validateService, updateService)
router.delete('/services/:id', deleteService)
router.post("/projects", projectValidatior, createProject)
router.put("/projects/:id", projectValidatior, updateProject)
router.delete("/projects/:id", deleteProject);
router.post('/create_jobs', uploadOptions.single('image'), createJob);
router.put('/update_jobs/:id', uploadOptions.single('image'), updateCreatedJob);
router.delete('/delete_jobs/:id', deleteCreatedJob);


export default router;
