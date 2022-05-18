import multer from "multer";
import path from "path";


export default multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        let uploadError: any  = new Error('invalid image type');
        if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
            return cb(uploadError, false);
        }
        cb(null, true);
    }

});