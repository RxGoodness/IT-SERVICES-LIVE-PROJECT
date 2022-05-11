import express from "express";
const router = express.Router();
import { createAdmin, loginAdmin } from "../controllers/admin.controller";
import changePassword from '../controllers/changePassword';
import protect from "../middlewares/protectRoute";



router.route("/create").post(createAdmin);
router.route("/login").post(loginAdmin);
router.post("/change_password", protect, changePassword)

export default router;
