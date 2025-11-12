import multer from "multer";
import path from "path";

// factory to create a storage with a given folder
const makeStorage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => cb(null, folder),
    filename: (req, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname)),
  });

export  const homeUpload = multer({ storage: makeStorage("uploads") });
export const gymUpload  = multer({ storage: makeStorage("gymphoto") });
