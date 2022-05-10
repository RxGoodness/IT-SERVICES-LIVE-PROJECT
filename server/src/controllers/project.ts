import { Request, Response } from "express";
import projectDb from "../models/project";


export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, overview, editor } = req.body;
    const data = await projectDb.create({ name, overview, editor });
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ message: "Please input right details" });
  }
};
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const idFromOwner = req.params.id;

    const data = await projectDb.deleteOne({ id: idFromOwner });
    data.deletedCount
      ? res.status(200).json({ message: "successfully deleted" })
      : res.status(404).json({ message: "Already deleted" });
  } catch (error) {
    res.status(404).json({ message: "Please input right details" });
  }
};
export const updateProject = async (req: Request, res: Response) => {
  try {
    const idFromOwner = req.params.id;
    const { name, overview, editor } = req.body;
    const data = await projectDb.findOneAndUpdate(
      { id: idFromOwner },
      { name: name, overview: overview, editor: editor }
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ message: "Please input right details" });
  }
};