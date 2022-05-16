import { Request, Response } from "express";
import { unlink } from "fs/promises";
import asyncHandler from "express-async-handler";
import { validateImageFile } from "../utils";
import {
  createJob_Repo,
  findAndRemoveId_Repo,
  findIdAndUpdate_Repo,
  getJobsById,
  validateId,
} from "../repository/job_repository";
import CreateJob from "../models/createJobSchema";
import jobApp from "../models/jobApplication"


const createJob = asyncHandler(
  async (req: Record<string, any>, res: Response) => {
    const file = req.file;
    const checkfile = await validateImageFile(file);

    if (checkfile) {
      res.status(400);
      throw new Error(checkfile);
    }

    try {
      const { title, location, employmentType, description } = req.body;
      const fileName = req.file.filename;
      const basePath = `${req.protocol}://${req.get(
        "host"
      )}/public/uploads/${fileName}`;
      const crtJobs = {
        title,
        image: basePath,
        location,
        employmentType,
        description,
      };

      await createJob_Repo(crtJobs, res);
    } catch (error: any) {
      await unlink(req.file.path);
      res.status(500).json({ msg: error.message || "Job not created" });
    }
  }
);

const updateCreatedJob = asyncHandler(async (req: Request, res: Response) => {
  const file: any = req.file;
  let imagepath: unknown;

  const checkIdExists = await validateId(req.params.id);

  if (!checkIdExists) {
    res.status(400);
    throw new Error("Invalid Job Id");
  }

  const jobs = await getJobsById(req.params.id);

  if (!jobs) {
    res.status(404);
    throw new Error("Job not found");
  }

  if (file) {
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get(
      "host"
    )}/public/uploads/${fileName}`;
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
      description: req.body.description || jobs.description,
    };

    const updateJob = await findIdAndUpdate_Repo(req.params.id, checkAndUpdate);

    res.status(200).send(updateJob);
  } catch (error) {
    await unlink(file.path);
    res.status(404).json({ msg: "Job not updated" });
  }
});

const deleteCreatedJob = asyncHandler(async (req: Request, res: Response) => {
  const deletedJob = await findAndRemoveId_Repo(req.params.id);
  if (!deletedJob) {
    res.status(404).json({ msg: "Job not found" });
  } else {
    res.status(200).json({
      message: "Job deleted successfully",
    });
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

const jobApplication = asyncHandler(async (req, res) => {
  try {
    const input = req.body;

    const created = await jobApp.create({
      ...input,
    });
    if (created) {
      res.status(201);
    }
  } catch (error) {
    res.status(404);
    throw new Error("Please provide right details");
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
