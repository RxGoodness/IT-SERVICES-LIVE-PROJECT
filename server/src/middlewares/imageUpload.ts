import multer from "multer";

const FILE_TYPE_MAP: any = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
}
const storage = multer.diskStorage({
    destination: function (_req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError: Error | null = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads');
    },
    filename: function (_req, file, cb) {
      const fileName = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
  }) 

const uploadOptions = multer({ storage: storage })
export default uploadOptions;