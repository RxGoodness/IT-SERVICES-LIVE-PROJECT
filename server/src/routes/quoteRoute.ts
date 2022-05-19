import express from "express";

import { getAllQuotes, requestQuote, sendQuote } from "../controllers/quotes";
import protect from "../middlewares/protectRoute";

const router = express.Router();

router.get("/", getAllQuotes);
router.post("/", requestQuote);
router.post("/:id", protect, sendQuote);

export default router;
