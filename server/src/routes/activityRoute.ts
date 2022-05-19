import express from 'express';
import { viewActivity, viewAllActivities,deleteActivity} from '../controllers/activity';
const activityRouter = express.Router();

activityRouter.get("/", viewActivity);
activityRouter.get("/all", viewAllActivities);
activityRouter.delete("/:id", deleteActivity);

export default activityRouter;