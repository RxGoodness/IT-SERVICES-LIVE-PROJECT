import express from 'express';
import { viewProfile, editProfile } from '../controllers/index';
import editProfileValidator from '../middlewares/index';
const router = express.Router();



// VIEW PROFILE
router.get('/view-profile/view', viewProfile);


// EDIT PROFILE
router.put('/edit-profile/edit', editProfileValidator, editProfile);




export default router;
