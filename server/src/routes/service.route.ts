import express from "express";

import { validateService } from "../middlewares/serviceMiddleware";
import { createService, updateService, deleteService } from "../controllers/service";
import uploadOptions from '../middlewares/serviceImagesUploader';
const router = express.Router();

router.post("/", uploadOptions.array('images'), validateService, createService);
router.put("/:id", uploadOptions.array('images'), validateService, updateService);
router.delete("/:id", deleteService);

export default router;
