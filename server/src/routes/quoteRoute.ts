import express from "express";

import { requestQuote, sendQuote } from "../controllers/quotes";
import protect from "../middlewares/protectRoute";

const router = express.Router();

router.post("/", requestQuote);
router.post("/:id", protect, sendQuote);

export default router;
