import { Request, Response } from "express";
import Joi from "joi";
import mongoose from "mongoose";
import CreateJob from "../models/createJobSchema";
import { unlink } from "fs/promises";


const createJob = async (req: any, res: Response) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        location: Joi.string().required(),
        employmentType: Joi.string().required(),
        description: Joi.string().required()
    });

    const validSchema = schema.validate(req.body);

    if (validSchema.error) {
        await unlink(req.file.path);
        return res.status(400).send(validSchema.error.details[0].message);
    };

    const file = req.file;

    if (!file) {
        return res.status(400).send("No image in the request");
    }

    try {
        const { title, location, employmentType, description } = req.body;
        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`;
        const crtJobs = {
            title,
            image: basePath,
            location,
            employmentType,
            description
        };

        const data = await CreateJob.create(crtJobs);

        return res.status(200).send(data);

    } catch (error) {
        await unlink(req.file.path);
        return res.status(500).send(error);
    }

};


const updateCreatedJob = async (req: Request, res: Response) => {
    const file: any = req.file;
    let imagepath: any;

    if (!mongoose.isValidObjectId(req.params.id)) {
        await unlink(file.path);
        return res.status(400).send("Invalid Job Id");
    };

    const schema = Joi.object({
        title: Joi.string(),
        location: Joi.string(),
        employmentType: Joi.string(),
        description: Joi.string()
    });

    const validSchema = schema.validate(req.body);

    if (validSchema.error) {
        await unlink(file.path);
        return res.status(400).send(validSchema.error.details[0].message);

    };

    const jobs = await CreateJob.findById(req.params.id);

    if (!jobs) {
        await unlink(file.path);
        return res.status(404).send("Job not found");
    };


    if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`;
        imagepath = basePath;
    } else {
        imagepath = jobs.image;
    }

    try {
        const updateJob = await CreateJob.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title || jobs.title,
                image: imagepath,
                location: req.body.location || jobs.location,
                employmentType: req.body.employmentType || jobs.employmentType,
                description: req.body.description || jobs.description
            }, { new: true }
        );

        if (!updateJob) {
            await unlink(file.path);
            return res.status(404).send("Job not updated");
        };

        return res.status(200).send(updateJob);
    } catch (error) {
        await unlink(file.path);
        return res.status(500).send(error);
    }
};


const deleteCreatedJob = async (req: Request, res: Response) => {
    try {
        const deletedJob = await CreateJob.findByIdAndRemove(req.params.id)
        if (!deletedJob) {
            return res.status(404).send("Job not found");
        } else {
            return res.status(200).json({
                message: "Job deleted successfully"
            });
        }
    } catch (error) {
        return res.status(500).json({ error });
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

export { createJob, updateCreatedJob, deleteCreatedJob, getAllJobs, };