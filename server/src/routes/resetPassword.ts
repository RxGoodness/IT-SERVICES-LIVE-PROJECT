import express from "express";
const router = express();
import { enterEmail, resetPassword } from "../controllers/resetPassword";

router.post("/enter-email", enterEmail);
router.post("/:userId/:token", resetPassword);

export default router;
