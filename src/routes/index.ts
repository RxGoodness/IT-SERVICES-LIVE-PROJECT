import express from 'express';
import test from '../controllers';
const router = express.Router();

/* GET home page. */
router.get('/test', test);

export default router;
