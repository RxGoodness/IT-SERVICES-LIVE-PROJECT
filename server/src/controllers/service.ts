import { Request, Response } from 'express';
import Service from '../models/service';
import asyncHandler from 'express-async-handler';

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
      throw new Error('No image in the request, Please choose files');
    }
    console.log(files);

    // try {
    const filesPath = files.map((file: any) => {
      return `${req.protocol}://${req.get('host')}/public/uploads/${
        file.filename
      }`;
    });
    console.log(filesPath);

    const service = {
      category,
      subcategory: {
        subDescription: Array.isArray(subDescription)
          ? [subDescription]
          : subDescription,
        images: filesPath,
      },
      description,
      bestFeature,
      technologies,
      pricePackages,
    };

    const newService = await Service.create(service);

    res.status(201).json(newService);
  }
);

export const updateService = asyncHandler(
  async (req: Record<string, any>, res: Response) => {
    const { category, description, bestFeature, technologies, pricePackages } =
      req.body;

    const ownerId = req.params.id;
    const files = req.files;

    let imagepath: any;

    const service = await Service.findById(ownerId);

    if (!service) {
      res.status(400).json({ msg: 'Service not found' });
    }
    let filesPath;
    if (files) {
      filesPath = files.map((file: any) => {
        return `${req.protocol}://${req.get('host')}/public/uploads/${
          file.filename
        }`;
      });
    }

    await Service.updateOne(
      { id: ownerId },
      {
        ...req.body,
        ...service.subcategory,
        subcategory: {
          subDescription: req.body.subDescription,
          images: filesPath,
        },
      }
    );
    // imagepath = filesPath;
    // } else {
    //   imagepath = service.images;
    // }
    // console.log('here', service);

    // const newUpdate = {
    //   category,
    //   subcategory: {
    //     subDescription,
    //     images: imagepath,
    //   },
    //   description,
    //   bestFeature,
    //   technologies,
    //   pricePackages,
    // };
    // await Service.findByIdAndUpdate(ownerId, [...service], newUpdate);

    res.status(200).json({ msg: 'Service updated successfully' });
  }
);

export const deleteService = async (req: Request, res: Response) => {
  const ownerId = req.params.id;
  const deleted = await Service.findByIdAndDelete(ownerId);
  if (!deleted) {
    res.status(404).json({ msg: "Service not found" });
  } else {
    return res.status(200).json({ msg: deleted });
  }
};
