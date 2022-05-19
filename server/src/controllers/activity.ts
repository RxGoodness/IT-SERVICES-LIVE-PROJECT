import {Request, Response} from "express";
//import { request } from "http";

import Activity from '../models/activity'

export const viewActivity = async (req: Request, res: Response) => {
    try {
      const post = await Activity.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  export const viewAllActivities = async (_req: Request, res: Response) => {

    try {
        const data = await Activity.find();
        return res.status(200).send(data);
    }
    catch (error) {
        return res.status(500).send(error);
    }

}



export const deleteActivity = async (req: Request, res: Response) => {
    try {
      const post = await Activity.findById(req.params.id);
      if (post) {
        try {
          await post.delete();
          res.status(200).json("Activity has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("Activity not found!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };
  