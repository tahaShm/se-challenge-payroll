import ReportDTO from "./dto/reportDTO.js";
import { ERRORS } from "../resources/constants.js";

const checkDuplicateReportId = async (reportId) => {
    const report = await ReportDTO.findOne({
        where: { report_id: reportId },
    });

    return report;
};

const createNewReport = async (reportId) => {
    await ReportDTO.create({
        report_id: reportId,
        uploaded_at: new Date(),
    });
};

export { checkDuplicateReportId, createNewReport };
