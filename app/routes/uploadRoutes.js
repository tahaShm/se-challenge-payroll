import express from "express";
const router = express.Router();

import { uploadFile, upload } from "../controllers/uploadController.js";

router.route("/").post(upload.single("file"), uploadFile);

export default router;
