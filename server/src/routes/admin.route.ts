import express from "express";
const router = express.Router();
import { createAdmin, loginAdmin } from "../controllers/admin.controller";
import changePassword from '../controllers/changePassword';

router.route("/create").post(createAdmin);
router.route("/login").post(loginAdmin);
router.put("/change_password", changePassword)

export default router;
