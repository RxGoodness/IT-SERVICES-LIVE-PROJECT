import { Request, Response } from "express";
import { unlink } from "fs/promises";
import asyncHandler from "express-async-handler";
import { validateImageFile } from "../utils";
import { deleteFile } from "../middlewares/process.documents";
import { sendEmail } from "../utils";
import {
  createJob_Repo,
  findAndRemoveId_Repo,
  findIdAndUpdate_Repo,
  findOneItem,
  getJobsById,
  validateId,
} from "../repository/job_repository";
import CreateJob from "../models/createJobSchema";
import jobApp from "../models/jobApplication";
import cloudinary from "../config/cloudinary";
import { deleteImg } from "../middlewares/process.image";

const createJob = asyncHandler(
  async (req: Record<string, any>, res: Response) => {
    try {
      const file = req.file;
      const checkfile = await validateImageFile(file);
    
      if (checkfile) {
        res.status(400);
        throw new Error(checkfile);
      }

      // upload image to cloudinary
      const result = await cloudinary.uploader
      .upload(file.path, {
        folder: "DEV",
      });

      // Create a new job
      const { title, location, employmentType, description } = req.body;
      const crtJobs = {
        title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        location,
        employmentType,
        description,
      };

      await createJob_Repo(crtJobs, res);
      
    } catch (error: any) {
      deleteImg(req.file.filename);
      res.status(500).json({ msg: error.message || "Job not created" });
    }
  }
);

const updateCreatedJob = asyncHandler(async (req: Request, res: Response) => {
  try {
    const file = req.file;
    let newImagePath: unknown;
    let newCloudinaryId: unknown;

    const checkIdExists = await validateId(req.params.id);

    if (!checkIdExists) {
      res.status(400);
      throw new Error("Invalid Job Id");
    }

    const jobs = await getJobsById(req.params.id);
    const select_cloud_id = await findOneItem(req.params.id);
    

    if (!jobs) {
      res.status(404);
      throw new Error("Job not found");
    }

    if (file) {
      // Delete image from Cloudinary
      await cloudinary.uploader.destroy(select_cloud_id.cloudinaryId);
      // Upload image to cloudinary
      let result = await cloudinary.uploader.upload(file.path, {
        folder: "DEV",
      })
      newImagePath = result.secure_url;
      newCloudinaryId = result.public_id;
    } else {
      newImagePath = jobs.image;
      newCloudinaryId = select_cloud_id.cloudinaryId
    }

  
    const checkAndUpdate: Record<string, any> = {
      title: req.body.title || jobs.title,
      image: newImagePath,
      cloudinaryId: newCloudinaryId,
      location: req.body.location || jobs.location,
      employmentType: req.body.employmentType || jobs.employmentType,
      description: req.body.description || jobs.description,
    };

    const updateJob = await findIdAndUpdate_Repo(req.params.id, checkAndUpdate);

    res.status(200).send(updateJob);
  } catch (error) {
    res.status(404).json({ msg: "Job not updated" });
  }
});

const deleteCreatedJob = asyncHandler(async (req: Request, res: Response) => {
  try {
    const select_cloud_id = await findOneItem(req.params.id);
    const deletedJob = await findAndRemoveId_Repo(req.params.id);
    if (!deletedJob) {
      res.status(404).json({ msg: "Job not found" });
    } else {
      await cloudinary.uploader.destroy(select_cloud_id.cloudinaryId);
      res.status(200).json({
        msg: "Job deleted successfully",
      });
    }
  } catch (error: any) {
    throw new Error(error)
  }
});

const getAllJobs = asyncHandler(async (_req: Request, res: Response) => {
  const data = await CreateJob.find({});
  res.status(200).json(data);
});

const getJob = asyncHandler(async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await CreateJob.find({ id });
    data
      ? res.status(200).json({ data })
      : res.status(404).json({ msg: "Invalid input" });
  } catch (error) {
    res.status(404);
    throw new Error("Job not found");
  }
});

const jobApplication = asyncHandler(async (req: Request, res: Response) => {
  let CVPath = "";
  let CVFilename = "";
  let coverLetterPath = "";
  let coverLetterFilename = "";
  try {
    req.files.map((file) => {
      if (file.fieldname === "coverLetter") {
        coverLetterPath = file.path;
        coverLetterFilename = file.filename;
      }
      if (file.fieldname === "CV") {
        CVPath = file.path;
        CVFilename = file.filename;
      }
    });
    const data = {
      ...req.body,
      CV: CVPath,
      coverLetter: coverLetterPath,
    };
    const created = await jobApp.create({
      ...data,
    });
    if (created) {
      await sendEmail(
        req.body.email,
        "Job Application from Appoga",
        `You have successfully applied for a job with id ${req.body.jobAppId}`
      );
      res.status(201).json({ msg: "Application successful" });
    }
  } catch (error) {
    [CVFilename, coverLetterFilename].map((each) => deleteFile(each));
    res.status(404);
    throw new Error("Please provide all fields");
  }
});

export {
  createJob,
  updateCreatedJob,
  deleteCreatedJob,
  getAllJobs,
  getJob,
  jobApplication,
};
