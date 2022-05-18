import express from "express";
const router = express.Router();
import {
  createJob,
  deleteCreatedJob,
  updateCreatedJob,
  getAllJobs,
  getJob,
  jobApplication,
} from "../controllers/jobController";
import validateJobFields from "../middlewares/validateJob_fields";
import validateJobUpdate from "../middlewares/validateJobUpdate";
import uploadOptions from "../middlewares/imageUpload";
import protect from "../middlewares/protectRoute";
import upload from "../middlewares/process.documents";

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
router.get("/:id", getJob);
router.get("/", getAllJobs);
router.post("/application", upload.any(), jobApplication);

export default router;
