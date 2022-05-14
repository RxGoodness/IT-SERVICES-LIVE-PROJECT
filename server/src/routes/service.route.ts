import express from "express";

import { validateService } from "../middlewares/serviceMiddleware";
import { createService, updateService, deleteService } from "../controllers/service";
import uploadOptions from "../middlewares/imageUpload";

const router = express.Router();

router.post("/", uploadOptions.single('image'),  validateService, createService);
router.put("/:id", uploadOptions.single('image'), validateService, updateService);
router.delete("/:id", deleteService);

export default router;
