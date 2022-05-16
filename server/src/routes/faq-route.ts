import express from "express"
import { allFaqs, createFaqs, updateFaq, deleteFaq} from '../controllers/faq-controller'
import protect from "../middlewares/protectRoute"

const router = express.Router();

router.get("/faqs", protect, allFaqs)
router.post("/newfaq", protect, createFaqs)
router.put("/editfaq/:id", protect,updateFaq)
router.delete("/deletefaq/:id", protect, deleteFaq)

export default router;
