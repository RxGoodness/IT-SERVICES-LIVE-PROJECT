import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, _file) => {
    return {
      folder: "FILE",
      allowed_formats: ["pdf", "docx", "doc"],
   
    };
  },
});

//Function to delete image if any error
export const deleteFile = async (id: string) => {
  return cloudinary.uploader.destroy(id);
};

export default multer({ storage });
