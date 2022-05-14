import express from "express";
import {
  contactMessage,
  deleteNotification,
  viewNotifications,
} from "../controllers/NotificationControllers";
import { sendMail } from "../controllers/messageContacts";
import protect from "../middlewares/protectRoute";

const router = express.Router();

/* GET home page. */

router.post("/contact_us", contactMessage);
router.delete("/delete_notification/:id", deleteNotification);
router.get("/view_notifications", viewNotifications);
router.post("/send_mail", protect, sendMail);

export default router;
