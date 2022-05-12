import express from "express";

import { quote } from "../controllers/quotes";

const router = express.Router();

router.post("/", quote);

export default router;
