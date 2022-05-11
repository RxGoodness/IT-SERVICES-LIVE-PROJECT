import express from "express"
import { allFaqs, createFaqs, updateFaq, deleteFaq} from '../controllers/faq-controller'

const router = express.Router();

router.get("/faqs", allFaqs)
router.post("/newfaq", createFaqs)
router.put("/editfaq/:id", updateFaq)
router.delete("/deletefaq/:id", deleteFaq)

export default router;
