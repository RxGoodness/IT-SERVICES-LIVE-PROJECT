import { Request, Response } from "express";
import projectDb from "../models/project";

const test = (_req: Request, res: Response) => {
  res.send("Hello World");
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, overview, editor } = req.body;
    const data = await projectDb.create({ name, overview, editor });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "please input right details" });
  }
};
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const idFromOwner = req.params.id;
    console.log(idFromOwner);
    const data = await projectDb.deleteOne({ id: idFromOwner });
    console.log(data);
    res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    res.status(404).json({ message: "please input right details" });
  }
};
export const updateProject = async (req: Request, res: Response) => {
  try {
    const idFromOwner = req.params.id;
    console.log(idFromOwner);

    // const updatebody = req.body
    const { name, overview, editor } = req.body;
    const data = await projectDb.findOneAndUpdate(
      { id: idFromOwner },
      { name: name, overview: overview, editor: editor }
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ message: "please input right details" });
  }
};

export default test;
