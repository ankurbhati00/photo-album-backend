import express from "express";
import cors from 'cors';
const App = express();
const PORT = 8182;
import { uploadFile, deleteFile, multerUpload, getFile } from "./api/index.js";
App.use(cors());

App.get('/api/image/:id',getFile)
App.post("/api/upload", multerUpload.single("image"), uploadFile);
App.delete('/api/delete/:name',deleteFile )

App.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("Server is up !!");
});
