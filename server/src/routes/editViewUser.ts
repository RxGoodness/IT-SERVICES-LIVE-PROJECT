import express from "express";
import { viewProfile, editProfile } from "../controllers/editViewUser";
import editProfileValidator from "../middlewares/editUser";
const router = express.Router();

/* GET home page. */

router.get("/view", viewProfile);
router.put("/edit", editProfileValidator, editProfile);

export default router;
