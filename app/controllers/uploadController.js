import asyncHandler from "express-async-handler";
import multer from "multer";
import { checkDuplicateReportId, createNewReport } from "../models/reports.js";
import { createNewTimeEntry } from "../models/timeEntries.js";
import { checkJobGroupValidity } from "../models/jobGroups.js";
import { getReportId, processCSVFile } from "../utils/fileUtils.js";
import { convertStrToDate } from "../utils/dateUtils.js";
import { ERRORS, SUCCESSES } from "../resources/constants.js";

const upload = multer({ dest: "uploads/" });

const uploadFile = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error(ERRORS.INVALID_FILE);
    }

    const file = req.file;
    const filePath = file.path;
    const reportId = getReportId(file.originalname);

    if (!reportId) {
        res.status(400);
        throw new Error(ERRORS.INVALID_CSV_FILE_NAME);
    }

    try {
        const records = await processCSVFile(filePath);

        const duplicate_report = await checkDuplicateReportId(reportId);
        if (duplicate_report) {
            res.status(400);
            throw new Error(ERRORS.DUPLICATE_REPORT_ID + reportId);
        }

        await createNewReport(reportId);

        for (const record of records) {
            const jobGroup = await checkJobGroupValidity(record);
            if (!jobGroup) {
                res.status(400);
                throw new Error(ERRORS.INVALID_JOB_GROUP + record["job group"]);
            }

            await createNewTimeEntry(
                reportId,
                convertStrToDate(record["date"]),
                record
            );
        }

        res.status(200).json({
            message: SUCCESSES.FILE_UPLOAD_SUCCESS + file.originalname,
        });
    } catch (error) {
        if (!res.headersSent) {
            res.status(res.statusCode !== 200 ? res.statusCode : 500).json({
                error: error.message,
            });
        }
    }
});

export { upload, uploadFile };
