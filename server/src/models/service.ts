import { Schema, model } from 'mongoose';

const serviceSchema = new Schema(
  {
    category: {
      type: String,
      enum: [
        'Web Development',
        'Mobile App Development',
        'Blockchain Development',
        'Product Design (UI/UX)',
        'Product Testing',
        'Digital Marketing',
      ],
      required: true,
    },
    subcategory: {
      subDescription: {
        type: String,
        enum: [
          'Healthcare',
          'Education',
          'Financial Institutions',
          'Media',
          'Sport',
          'Real Estate',
          'Other',
        ],
        required: true,
      },
      images: {
        image1: { type: String, required: true },
        image2: { type: String, required: true },
        image3: { type: String, required: true },
        image4: { type: String, required: true },
      },
    },
    description: {
      type: String,
      required: true,
    },
    bestFeature: {
      type: String,
      required: true,
    },
    technologies: {
      type: String,
      required: true,
    },
    pricePackages: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Service = model('Service', serviceSchema);
export default Service;
