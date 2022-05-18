import express from "express";
const router = express.Router();
import { deletePartnership, requestPartnership, updatePartnership } from "../controllers/partnership.controller";
import protect from "../middlewares/protectRoute";
import upload from "../middlewares/process.image";
import { updatePartnershipValidator } from '../middlewares/validatePatnershipUpdate'

router
  .route("/request")
  .post(protect, upload.single("logo"), requestPartnership);

router.route("/updateRequest/:id")
  .patch(updatePartnershipValidator, protect, updatePartnership)

router.route("/deleteRequest/:id")
  .delete(updatePartnershipValidator, protect, deletePartnership)
export default router;
