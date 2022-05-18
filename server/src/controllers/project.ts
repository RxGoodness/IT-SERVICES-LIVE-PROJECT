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


export const getAllProject = asyncHandler (
  async (req: Request, res: Response) => {
    try {
      const caseStudy = await projectDb.find();
      res.status(200).json(caseStudy);
    } catch (error) {
      res.status(404)
    }
  }
)

export const getSingleProject = asyncHandler (
  async (req: Request, res: Response) => {
    try {
      const projectId = req.params.id;
      const project = await projectDb.findOne({_id: projectId});
      res.status(200).json(project)
    } catch (error) {
      res.status(400).json({msg: "Project not found"})
    }
  }
)