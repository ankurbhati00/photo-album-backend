import { constants } from "buffer";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "/upload"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

export const multerUpload = multer({ storage: storage });

//get file
export const getFile = (req, res) => {
  const id = req.params.id;
   var filePath = path.join(__dirname, "../", "/upload", id );
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'jpeg/png',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
}


//upload file to server
export const uploadFile = (req, res) => {
  return res.status(201).json({
    message: "successfuly uploaded ",
    name: req.file.filename,
    mimetype: req.file.mimetype,
  });
};

//delete file from server
export const deleteFile = async (req, res) => {
  const fileName = req.params.name;
  try {
    fs.rmSync(path.join(__dirname, "../", "/upload", fileName));
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "file not found",
    });
  }

  return res.status(200).json({
    message: "deleted successfully",
  });
};
