import { Request, Response } from "express";
import Service from "../models/service";
import asyncHandler from "express-async-handler";
import { deleteImg } from "../middlewares/process.image";
import Activity from "../models/activity";

export const getServices = asyncHandler(async (req: Request, res: Response) => {
  const services = await Service.find();

  //RECORD ACTIVITY
  const newActivity = new Activity({
    message: `All services were viewed succesfully`,
  });
  const savedActivity = await newActivity.save();

  res.status(200).json({
    msg: services,
  });
});

export const getService = asyncHandler(async (req: Request, res: Response) => {
  const service = await Service.findById(req.params.id);

  //RECORD ACTIVITY
  const newActivity = new Activity({
    message: `A service was viewed succesfully`,
    author: "Admin",
    authorActivityTitleOrName: service.category,
    authorActivityID: service._id,
  });
  const savedActivity = await newActivity.save();

  res.status(200).json({
    msg: service,
  });
});

export const updateService = asyncHandler(
  async (req: Record<string, any>, res: Response) => {
    const {
      category,
      subDescription,
      description,
      bestFeature,
      technologies,
      pricePackages,
    } = req.body;

    const theService = await Service.findById(req.params.id);

    const files = req.files;

    let filesPath: any = {};
    files.map((file: any) => {
      filesPath[file.fieldname] = file.path;
      deleteUpdateImage(theService.subcategory.images[file.fieldname]);
    });

    const newService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        category,
        subcategory: {
          subDescription,
          images: { ...theService.subcategory.images, ...filesPath },
        },
        description,
        bestFeature,
        technologies,
        pricePackages,
      },
      { new: true }
    );

    //RECORD ACTIVITY
    const newActivity = new Activity({
      message: `A service was updated succesfully`,
      author: "Admin",
      authorActivityTitleOrName: newService.category,
      authorActivityID: newService._id,
    });
    const savedActivity = await newActivity.save();

    res.status(200).json({
      msg: "Service updated successfully",
      newService,
    });
  }
);

export const createService = asyncHandler(
  async (req: Record<string, any>, res: Response) => {
    const {
      category,
      subDescription,
      description,
      bestFeature,
      technologies,
      pricePackages,
    } = req.body;
    const files = req.files;

    if (!files) {
      res.status(400);
      throw new Error("No image in the request, Please choose files");
    }

    let filesPath: any = {};
    files.map((file: any) => {
      filesPath[file.fieldname] = file.path;
    });

    const service = {
      category,
      subcategory: {
        subDescription,
        images: filesPath,
      },
      description,
      bestFeature,
      technologies,
      pricePackages,
    };
    const newService = await Service.create(service);

    //RECORD ACTIVITY
    const newActivity = new Activity({
      message: `A service was created succesfully`,
      author: "Admin",
      authorActivityTitleOrName: newService.category,
      authorActivityID: newService._id,
    });
    const savedActivity = await newActivity.save();

    res.status(201).json(newService);
  }
);

function deleteUpdateImage(imageLink: string) {
  let splittedArray = imageLink.split("/");
  let imageName = splittedArray[splittedArray.length - 1].split(".")[0];
  let imageFolder = splittedArray[splittedArray.length - 2];
  deleteImg(`${imageFolder}/${imageName}`);

  //   //RECORD ACTIVITY
  //  const newActivity = new Activity(
  //   {
  //   message: `An image was deleted from service, succesfully`,
  //   author: 'Admin',
  //   }
  //  )
  // const savedActivity = await newActivity.save();
}

export const deleteService = async (req: Request, res: Response) => {
  const ownerId = req.params.id;
  const toBeDeleted = await Service.findById(ownerId);
  const deleted = await Service.findByIdAndDelete(ownerId);
  if (!deleted) {
    res.status(404).json({ msg: "Service not found" });
  } else {
    //RECORD ACTIVITY
    const newActivity = new Activity({
      message: `A service was deleted succesfully`,
      author: "Admin",
      authorActivityTitleOrName: toBeDeleted.category,
      authorActivityID: toBeDeleted._id,
    });
    const savedActivity = await newActivity.save();

    return res.status(200).json({ msg: deleted });
  }
};
