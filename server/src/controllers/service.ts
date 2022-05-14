import { Request, Response } from 'express';
import Service from '../models/service';

export const createService = async (
  req: Record<string, any>,
  res: Response
) => {
  const {
    category,
    subDescription,
    image,
    description,
    bestFeature,
    technologies,
    pricePackages,
  } = req.body;
  const file = req.file;

  if (!file) {
    res.status(400);
    throw new Error('No image in the request');
  }

  try {
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get(
      'host'
    )}/public/uploads/${fileName}`;
    const newService = await Service.create({
      category,
      subcategory: [
        {
          subDescription,
        },
        {
          image: basePath ? image : null,
        },
      ],
      description,
      bestFeature,
      technologies,
      pricePackages,
    });
    return res.status(201).json(newService);
  } catch (error) {
    res.status(400);
    throw new Error('Service not created');
  }
};

export const updateService = async (
  req: Record<string, any>,
  res: Response
) => {
  const { category, description, bestFeature, technologies, pricePackages } =
    req.body;
  const ownerId = req.params.id;
  const file = req.file;
  let imagepath: any;

  const service = await Service.findById(ownerId);

  if (file) {
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get(
      'host'
    )}/public/uploads/${fileName}`;
    imagepath = basePath;
  } else {
    imagepath = service.image;
  }

  try {
    await Service.findByIdAndUpdate(
      service,
      {
        category,
        subcategory: [
          {
            description,
          },
          {
            image: imagepath,
          },
        ],
        description,
        bestFeature,
        technologies,
        pricePackages,
      },
      { new: true }
    );

    res.status(200).json({ msg: 'Service updated successfully' });
  } catch (error) {
    res.status(400);
    throw new Error('Service not updated');
  }
};

export const deleteService = async (req: Request, res: Response) => {
  const ownerId = req.params.id;
  const deleted = await Service.findByIdAndDelete(ownerId);
  if (!deleted) {
    res.status(404);
    throw new Error('Service not found');
  } else {
    return res.status(200).json({ msg: deleted });
  }
};
