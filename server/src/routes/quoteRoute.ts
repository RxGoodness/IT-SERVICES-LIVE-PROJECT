import express from "express";

import { requestQuote, sendQuote } from "../controllers/quotes";

const router = express.Router();

router.post("/", requestQuote);
router.post("/:id", sendQuote);

export default router;
