import { Response } from "express";
import mongoose from "mongoose";
import CreateJob from "../models/createJobSchema"
import Activity from "../models/activity";

const createJob_Repo = async (req:Record<string, any>, res: Response) => {
    try {
        const data = await CreateJob.create(req)


//RECORD ACTIVITY
const newActivity = new Activity(
    {
    message: `A job post was created succesfully `,
     author: 'Admin',   
     authorActivityTitleOrName: data.title,
     authorActivityID:data._id
    }
   ) 
 const savedActivity = await newActivity.save();      

        return res.status(200).send(data);
    } catch (error: any) {
        throw Error(error)
    }    
};

const validateId = async (userId: string) => {
    return mongoose.isValidObjectId(userId)
}


const getJobsById = async (userId: string) => {
    const data = await CreateJob.findById(userId);
    //RECORD ACTIVITY
const newActivity = new Activity(
    {
    message: `Targeted job posts were viewed succesfully `,
      }
   ) 
 const savedActivity = await newActivity.save();      

return data;

}

const findIdAndUpdate_Repo = async (userId: string, obj: Record<string, any>) => {
    const data = await CreateJob.findByIdAndUpdate(userId, obj, { new: true });

    const newActivity = new Activity(
        {
        message: `A job post was updated succesfully `,
         author: 'Admin',   
         authorActivityTitleOrName: data.title,
         authorActivityID:data._id
        }
       ) 
     const savedActivity = await newActivity.save();      
    

    return data;
}
const findOneItem = async (userId: string) => {
    const data = await CreateJob.findOne({_id: userId}).select('cloudinaryId');
   
    const newActivity = new Activity(
        {
        message: `A job post was viewed succesfully `,
         authorActivityTitleOrName: data.title,
         authorActivityID:data._id
        }
       ) 
     const savedActivity = await newActivity.save();      
    

    return data;
}


const findAndRemoveId_Repo = async (userId: string) => {
    
     const toBeRemovedData = await CreateJob.findById(userId)  
     const newActivity = new Activity(
        {
        message: `A job post was found and removed succesfully `,
         author: 'Admin',   
         authorActivityTitleOrName: toBeRemovedData.title,
         authorActivityID:toBeRemovedData._id
        }
       ) 
     const savedActivity = await newActivity.save();      
    
     const data = await CreateJob.findByIdAndRemove(userId)  
     return data;
}

export {createJob_Repo, findOneItem, findIdAndUpdate_Repo, findAndRemoveId_Repo, getJobsById, validateId};