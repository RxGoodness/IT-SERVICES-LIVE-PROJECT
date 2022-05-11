import express from 'express';
import {createJob, deleteCreatedJob, updateCreatedJob} from '../controllers/jobController';
import  { createProject, updateProject, deleteProject}from '../controllers/project';
import uploadOptions from '../middlewares/imageUpload';
import {projectValidatior} from "../middlewares/projectMiddleware"
import { createBlog, editBlog, deleteBlog, viewBlog, viewBlogs, commentPost} from '../controllers/blogPost';
const router = express.Router();

/* GET home page. */

router.post("/projects", projectValidatior, createProject)
router.put("/projects/:id", projectValidatior, updateProject)
router.delete("/projects/:id", deleteProject);
router.post('/create_jobs', uploadOptions.single('image'), createJob);
router.put('/update_jobs/:id', uploadOptions.single('image'), updateCreatedJob);
router.delete('/delete_jobs/:id', deleteCreatedJob);


router.post("/blog", createBlog)
router.put("/blog/:id", editBlog)
router.delete("/blog/:id", deleteBlog)
router.get("/blog/:id", viewBlog)
router.get("/blog", viewBlogs)
router.post("/blog/comment/:id/", commentPost);
export default router;
