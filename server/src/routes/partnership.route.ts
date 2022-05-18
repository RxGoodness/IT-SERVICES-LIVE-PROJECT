import express from "express";
const router = express.Router();
import { deletePartnership, getOnePartnership, requestPartnership, updatePartnership, getAllPartnership } from "../controllers/partnership.controller";
import protect from "../middlewares/protectRoute";
import upload from "../middlewares/process.image";
import { updatePartnershipValidator } from '../middlewares/validatePatnershipUpdate'

router
  .route("/request")
  .post(protect, upload.single("image"), requestPartnership);

router.route("/updateRequest/:id")
  .patch(updatePartnershipValidator, protect, updatePartnership)

router.route("/deleteRequest/:id")
  .delete(updatePartnershipValidator, protect, deletePartnership)

router.get("/partnerships", protect, getAllPartnership)
router.get("/partnership/:id", protect, getOnePartnership)

export default router;
