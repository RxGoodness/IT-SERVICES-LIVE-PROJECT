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
      folder: "DEV",
      allowed_formats: ["png", "jpeg", "jpg"],
  
    };
  },
});

//Function to delete image if any error
export const deleteImg = async (id: string) => {
  return cloudinary.uploader.destroy(id);
};

//Function to delete image when running update or delete
export function deleteUpdateImage(imageLink: string) {
  const splittedArray = imageLink.split("/");
  const imageName = splittedArray[splittedArray.length - 1].split(".")[0];
  const imageFolder = splittedArray[splittedArray.length - 2];
  deleteImg(`${imageFolder}/${imageName}`);
}


export default multer({ storage });
