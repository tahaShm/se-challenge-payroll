import { convertStrToDate, getPayPeriod } from "./app/utils/dateUtils.js";
import { getReportId, processCSVFile } from "./app/utils/fileUtils.js";
import { convertPayrollData } from "./app/utils/payrollUtils.js";
import fs from "fs";
import { ERRORS } from "./app/resources/constants.js";

// Mock file system operations
jest.mock("fs", () => ({
    createReadStream: jest.fn(),
    unlinkSync: jest.fn(),
}));

jest.mock("csv-parser", () =>
    jest.fn(() => ({
        on: jest.fn((event, callback) => {
            if (event === "data") {
                callback({
                    date: "4/1/2023",
                    "hours worked": 10,
                    "employee id": 1,
                    "job group": "A",
                });
            }
            if (event === "end") {
                callback();
            }
        }),
    }))
);

describe("Utility Functions", () => {
    describe("convertStrToDate", () => {
        it("should convert a DD/MM/YYYY string to a Date object", () => {
            const dateStr = "04/01/2023";
            const expectedDate = new Date("2023-01-04");
            expect(convertStrToDate(dateStr)).toEqual(expectedDate);
        });
    });

    describe("getPayPeriod", () => {
        it("should return correct pay period for the first half of the month", () => {
            const date = "2023-01-10";
            expect(getPayPeriod(date)).toEqual({
                startDate: "2023-01-01",
                endDate: "2023-01-15",
            });
        });

        it("should return correct pay period for the second half of the month", () => {
            const date = "2023-01-20";
            expect(getPayPeriod(date)).toEqual({
                startDate: "2023-01-16",
                endDate: "2023-01-31",
            });
        });
    });

    describe("getReportId", () => {
        it("should extract the report ID from the file name", () => {
            expect(getReportId("time-report-123.csv")).toBe("123");
        });

        it("should throw an error for invalid file names", () => {
            expect(() => getReportId("invalid-file.csv")).toThrow();
        });
    });

    describe("processCSVFile", () => {
        it("should process a CSV file and return an array of records", async () => {
            const filePath = "fake/path.csv";
            fs.createReadStream.mockReturnValueOnce({
                pipe: jest.fn().mockReturnThis(),
                on: jest.fn((event, callback) => {
                    if (event === "end") callback();
                }),
            });

            const records = await processCSVFile(filePath);
            expect(records).toEqual([
                {
                    date: "4/1/2023",
                    "hours worked": 10,
                    "employee id": 1,
                    "job group": "A",
                },
            ]);
            expect(fs.unlinkSync).toHaveBeenCalledWith(filePath);
        });

        it("should throw an error if CSV processing fails", async () => {
            const filePath = "fake/path.csv";
            fs.createReadStream.mockImplementationOnce(() => {
                throw new Error("File not found");
            });

            await expect(processCSVFile(filePath)).rejects.toThrow(
                ERRORS.CSV_PROCESSING_ERROR + "File not found"
            );
        });
    });

    describe("convertPayrollData", () => {
        it("should correctly format payroll data", () => {
            const payrollData = {
                "1-2023-01-01": {
                    employeeId: 1,
                    payPeriod: {
                        startDate: "2023-01-01",
                        endDate: "2023-01-15",
                    },
                    amountPaid: 300,
                },
            };

            expect(convertPayrollData(payrollData)).toEqual([
                {
                    employeeId: 1,
                    payPeriod: {
                        startDate: "2023-01-01",
                        endDate: "2023-01-15",
                    },
                    amountPaid: "$300.00",
                },
            ]);
        });
    });
});
