import { asyncHandler } from "express-async-handler";
import axios from "axios";
import TimeEntriesModel from "../models/timeEntriesModel";
import ReportModel from "../models/reportModel";
import JobGroupModel from "../models/jobGroupModel";

const getReport = asyncHandler(async (req, res) => {
    const report = await ReportModel.findAll();
    res.json(report);
});

export { getReport };
