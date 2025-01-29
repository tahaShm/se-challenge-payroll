import express from "express";
const router = express.Router();

import { uploadFile } from "../controllers/uploadController.js";

router.route("/:report_id").post(uploadFile);


