import { Response } from "express";
import mongoose from "mongoose";
import CreateJob from "../models/createJobSchema"


const createJob_Repo = async (req:Record<string, any>, res: Response) => {
    try {
        const data = await CreateJob.create(req)
        return res.status(200).send(data);
    } catch (error: any) {
        throw Error(error)
    }    
};

const validateId = async (userId: string) => {
    return mongoose.isValidObjectId(userId)
}


const getJobsById = async (userId: string) => {
    return await CreateJob.findById(userId);
}

const findIdAndUpdate_Repo = async (userId: string, obj: Record<string, any>) => {
    const data = await CreateJob.findByIdAndUpdate(userId, obj, { new: true });
    return data;
}
const findOneItem = async (userId: string) => {
    const data = await CreateJob.findOne({_id: userId}).select('cloudinaryId');
    return data;
}


const findAndRemoveId_Repo = async (userId: string) => {
    return await CreateJob.findByIdAndRemove(userId)  
}

export {createJob_Repo, findOneItem, findIdAndUpdate_Repo, findAndRemoveId_Repo, getJobsById, validateId};