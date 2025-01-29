import express from "express";
const router = express.Router();

import { getReport } from "../controllers/reportController.js";

router.route("/").get(getReport);