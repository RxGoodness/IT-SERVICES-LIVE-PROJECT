import express from "express";
import upload from "../middlewares/process.image";

import { validateService } from "../middlewares/serviceMiddleware";
import { createService, updateService, deleteService } from "../controllers/service";
const router = express.Router();

router.post("/", upload.any(), validateService, createService);
router.put("/:id", upload.any(), validateService, updateService);
router.delete("/:id", deleteService);

export default router;
