import express from "express";
const router = express.Router();
import {
  createJob,
  deleteCreatedJob,
  updateCreatedJob,
} from "../controllers/jobController";
import validateJobFields from "../middlewares/validateJob_fields";
import validateJobUpdate from "../middlewares/validateJobUpdate";
import uploadOptions from "../middlewares/imageUpload";
import protect from "../middlewares/protectRoute";

router.post(
  "/create",
  uploadOptions.single("image"),
  validateJobFields,
  createJob
);
router.put(
  "/update/:id",
  uploadOptions.single("image"),
  validateJobUpdate,
  updateCreatedJob
);
router.delete("/delete/:id", protect, deleteCreatedJob);

export default router;
