import { Response } from "express";
import mongoose from "mongoose";
import CreateJob from "../models/createJobSchema"

// {
//     title: 'back bone',
//     image: 'http://localhost:3000/public/uploads/6.png-1652216622009.png',      
//     location: 'lagos',
//     employmentType: 'Part-time',
//     description: 'Senior Full Stack Dev' 
//   }

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
    console.log(userId)
    return await CreateJob.findById(userId);
}

const findIdAndUpdate_Repo = async (userId: string, obj: Record<string, any>) => {
    return await CreateJob.findByIdAndUpdate(userId, obj, { new: true });
}


const findAndRemoveId_Repo = async (userId: string) => {
    return await CreateJob.findByIdAndRemove(userId)
    // await CreateJob.findByIdAndRemove(userId);
    // return res.status(200).json({
    //     message: "Job deleted successfully"
    // });

    // try {
    //     const deletedJob =  await CreateJob.findByIdAndRemove(userId)
    //     if(data){
    //         return res.status(200).json({
    //             message: "Job deleted successfully"
    //         })
    //     }
    // } catch (error: any) {
    //     throw Error(error)
    // }   
}

export {createJob_Repo, findIdAndUpdate_Repo, findAndRemoveId_Repo, getJobsById, validateId};