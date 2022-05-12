import express from 'express';
import {createJob, deleteCreatedJob, updateCreatedJob} from '../controllers/jobController';
import  { createProject, updateProject, deleteProject}from '../controllers/project';
import uploadOptions from '../middlewares/imageUpload';
import {projectValidatior} from "../middlewares/projectMiddleware"
import {contactMessage, deleteNotification, viewNotifications} from "../controllers/NotificationControllers"
import {sendMail} from "../controllers/messageContacts"
import protect from "../middlewares/protectRoute";
import validateJobFields from "../middlewares/validateJob_fields";
import validateJobUpdate from "../middlewares/validateJobUpdate";

const router = express.Router();

/* GET home page. */

router.post("/projects", projectValidatior, protect, createProject);
router.put("/projects/:id", projectValidatior, protect, updateProject);
router.delete("/projects/:id", protect, deleteProject);
router.post('/create_jobs', uploadOptions.single('image'), validateJobFields, createJob);
router.put('/update_jobs/:id', uploadOptions.single('image'), validateJobUpdate, updateCreatedJob);
router.delete("/delete_jobs/:id", protect, deleteCreatedJob);
router.post('/contact_us', contactMessage)
router.delete('/delete_notification/:id', deleteNotification)
router.get('/view_notifications', viewNotifications)
router.post('/send_mail', sendMail)



export default router;
