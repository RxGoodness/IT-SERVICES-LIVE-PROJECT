import express from 'express';
import { viewProfile, editProfile } from '../controllers/editViewUser';
import editProfileValidator from '../middlewares/editUser';
const router = express.Router();


/* GET home page. */


router.get('/view-profile/view', viewProfile);
router.put('/edit-profile/edit', editProfileValidator, editProfile);



export default router;
