import fs from "fs";
import csvParser from "csv-parser";
import { ERRORS } from "../resources/constants.js";

const getReportId = (fileName) => {
    return fileName.match(/time-report-(\d+)\.csv/)[1];
};

const processCSVFile = async (filePath) => {
    const records = [];

    try {
        const stream = fs
            .createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (row) => {
                records.push(row);
            });

        await new Promise((resolve, reject) => {
            stream.on("end", resolve);
            stream.on("error", reject);
        });
        return records;
    } catch (error) {
        throw new Error(ERRORS.CSV_PROCESSING_ERROR + error.message);
    } finally {
        fs.unlinkSync(filePath);
    }
};

export { getReportId, processCSVFile };
