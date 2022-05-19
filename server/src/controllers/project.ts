import { Request, Response } from "express";
import projectDb from "../models/project";
import asyncHandler from "express-async-handler";
import { deleteImg, deleteUpdateImage} from "../middlewares/process.image";
import Activity from "../models/activity";

export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const input = { ...req.body, featuredImage: req.file!.path };
      const data = await projectDb.create({ ...input });
       
      //RECORD ACTIVITY
      const newActivity = new Activity(
        {
        message: `A project was created succesfully`,
        author: 'Admin',
        authorActivityTitleOrName: data.name,
        authorActivityID: data._id
        }
       )
   
     const savedActivity = await newActivity.save();
    
      res.status(201).json(data);
    } catch (error) {
      deleteImg(req.file!.filename);
      res.status(404).json({ msg: "Please input right details" });
    }
  }
);

export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const idFromOwner = req.params.id;
      const data = await projectDb.findByIdAndDelete(idFromOwner);
      if (data.featuredImage) {
        deleteUpdateImage(data.featuredImage);
      }
      if (data) {

      //RECORD ACTIVITY
      const myData = await projectDb.findById({_id: idFromOwner})
        const newActivity = new Activity(
          { 
          message: `A project was deleted succesfully`,
          author: 'Admin',
          authorActivityTitleOrName: myData.name,
          authorActivityID: myData._id
          }
         ) 
       const savedActivity = await newActivity.save();
      
       const data = await projectDb.deleteOne({ id: idFromOwner });
        res.status(200).json({ message: "successfully deleted" });
        return;
      }
    } catch (error) {
      res.status(404).json({ msg: "Not Found" });
      return;
    }
  }
);



export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const idFromOwner = req.params.id;
      const prevData = await projectDb.findOne({ id: idFromOwner });
      if (req.file) {
        deleteUpdateImage(prevData.featuredImage);
      }
      const img = req.file?.path;
      const data = await projectDb.findOneAndUpdate(
        { id: idFromOwner },
        { featuredImage: img, ...req.body },
        {
          new: true,
        }
      );
      //RECORD ACTIVITY
      const newActivity = new Activity(
        {
        message: `A project was updated succesfully`,
        author: 'Admin',
        authorActivityTitleOrName: data.name,
        authorActivityID: data._id
        }
       )
     const savedActivity = await newActivity.save();

      res.status(200).json({ data });
    } catch (error) {
      res.status(404).json({ msg: "Please input right details" });
    }
  }
)

export const getAllProject = asyncHandler (
  async (req: Request, res: Response) => {
    try {
      const caseStudy = await projectDb.find();

      //RECORD ACTIVITY
      const newActivity = new Activity(
        {
        message: `All projects were viewed succesfully`,
        }
       )
     const savedActivity = await newActivity.save();


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

      //RECORD ACTIVITY
      const newActivity = new Activity(
        {
        message: `A project was viewed succesfully`,
        authorActivityTitleOrName: project.name,
        authorActivityID: project._id
        }
       )
     const savedActivity = await newActivity.save();

      res.status(200).json(project)
    } catch (error) {
      res.status(400).json({msg: "Project not found"})
    }
  }
);


