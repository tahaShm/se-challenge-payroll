import express from "express";
const router = express.Router();

import { getPayrollReport } from "../controllers/reportController.js";

router.route("/").get(getPayrollReport);

export default router;
