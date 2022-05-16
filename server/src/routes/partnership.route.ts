import express from "express";
const router = express.Router();
import { requestPartnership } from "../controllers/partnership.controller";
import protect from "../middlewares/protectRoute";
import upload from "../middlewares/process.image";

router
  .route("/request")
  .post(protect, upload.single("image"), requestPartnership);

export default router;
