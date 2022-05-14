import { Request, Response } from "express";
import projectDb from "../models/project";
import asyncHandler from "express-async-handler";


export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name, overview, editor } = req.body;
      const data = await projectDb.create({ name, overview, editor });
      res.status(201).json(data);
    } catch (error) {
      res.status(404);
      throw new Error("Please input right details");
    }
  }
)

export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const idFromOwner = req.params.id;
      const data = await projectDb.deleteOne({ id: idFromOwner });
      data.deletedCount
        ? res.status(200).json({ message: "successfully deleted" })
        : res.status(404).json({ message: "Already deleted" });
    } catch (error) {
      res.status(404);
      throw new Error("Please input right details");
    }
  }
)

export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const idFromOwner = req.params.id;
      const { name, overview, editor } = req.body;
      const data = await projectDb.findOneAndUpdate(
        { id: idFromOwner },
        { name, overview, editor },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({ data });
    } catch (error) {
      res.status(404);
      throw new Error("Please input right details");
    }
  }
)
