import { Request, Response} from "express";
import { unlink } from "fs/promises";
import { validateImageFile } from "../utils";
import { createJob_Repo, findAndRemoveId_Repo, findIdAndUpdate_Repo, getJobsById, validateId } from "../repository/job_repository";
import CreateJob from "../models/createJobSchema";


const createJob = async (req:Record<string, any>, res:Response) => {

    const file = req.file;
    const checkfile = await validateImageFile(file);

    if(checkfile){
        return res.status(400).send(checkfile);
    }
    
    try {
        const {title, location, employmentType, description} = req.body;
        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`;
        const crtJobs = {
            title,
            image : basePath,
            location,
            employmentType,
            description
        };

        await createJob_Repo(crtJobs, res);

    } catch (error) {
        await unlink(req.file.path);
        return res.status(500).send(error);
    }
   
};


const updateCreatedJob = async (req:Request, res:Response) => {
    const file: any = req.file;
    let imagepath: unknown;

    const checkIdExists = await validateId(req.params.id);

    if(!checkIdExists) {
        return res.status(400).send("Invalid Job Id");
    };

    const jobs = await getJobsById(req.params.id);

    if(!jobs){
        return res.status(404).send("Job not found");
    };

    
    if(file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`;
        imagepath = basePath;
    } else {
        imagepath = jobs.image;
    }

    try {
        const checkAndUpdate: Record<string, any> = {
            title: req.body.title || jobs.title,
            image: imagepath,
            location: req.body.location || jobs.location,
            employmentType: req.body.employmentType || jobs.employmentType,
            description: req.body.description || jobs.description
        }

        const updateJob = await findIdAndUpdate_Repo(req.params.id, checkAndUpdate)

        return res.status(200).send(updateJob);

    } catch (error) {
        await unlink(file.path);
            return res.status(404).send("Job not updated");
    } 
};


const deleteCreatedJob = async (req:Request, res:Response) => {
    try {
        const deletedJob =  await findAndRemoveId_Repo(req.params.id)
        if(!deletedJob){
            return res.status(404).send("Job not found");
        }else{
            return res.status(200).json({
                message: "Job deleted successfully"
            });
        }
    } catch (error) {
        return res.status(500).json({error});
    }
};

const getAllJobs = async (_req: Request, res: Response) => {

    try {
        const data = await CreateJob.find({});
        return res.status(200).send(data);
    }
    catch (error) {
        return res.status(500).send(error);
    }

}

export {createJob, updateCreatedJob, deleteCreatedJob, getAllJobs};