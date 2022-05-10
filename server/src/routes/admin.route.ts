import express from "express";
const router = express.Router();
import { createAdmin, loginAdmin } from "../controllers/admin.controller";



router.route("/create").post(createAdmin);
router.route("/login").post(loginAdmin);

export default router;
