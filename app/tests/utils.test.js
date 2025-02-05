// functions.test.js
import { convertStrToDate, getPayPeriod } from "../utils/dateUtils.js";
import { getReportId } from "../utils/fileUtils.js";
import { convertPayrollData } from "../utils/payrollUtils.js";

describe("convertStrToDate", () => {
    it("should convert a string to a date object", () => {
        const result = convertStrToDate("05/02/2025");
        expect(result).toEqual(new Date("2025-02-05"));
    });
});

describe("getPayPeriod", () => {
    it("should return the correct pay period for dates before or on the 15th", () => {
        const result = getPayPeriod("2025-02-05");
        expect(result).toEqual({
            startDate: "2025-02-01",
            endDate: "2025-02-15",
        });
    });

    it("should return the correct pay period for dates after the 15th", () => {
        const result = getPayPeriod("2025-02-20");
        expect(result).toEqual({
            startDate: "2025-02-16",
            endDate: "2025-02-28",
        });
    });
});

describe("convertStrToDate", () => {
    it("should convert a string to a date object", () => {
        const result = convertStrToDate("05/02/2025");
        expect(result).toEqual(new Date("2025-02-05"));
    });
});

describe("getPayPeriod", () => {
    it("should return the correct pay period for dates before or on the 15th", () => {
        const result = getPayPeriod("2025-02-05");
        expect(result).toEqual({
            startDate: "2025-02-01",
            endDate: "2025-02-15",
        });
    });

    it("should return the correct pay period for dates after the 15th", () => {
        const result = getPayPeriod("2025-02-20");
        expect(result).toEqual({
            startDate: "2025-02-16",
            endDate: "2025-02-28",
        });
    });
});

describe("getReportId", () => {
    it("should extract the report ID from a valid filename", () => {
        const result = getReportId("time-report-12345.csv");
        expect(result).toBe("12345");
    });

    it("should throw an error for an invalid filename", () => {
        expect(() => getReportId("invalid-report.csv")).toThrow(
            "Cannot read properties of null"
        );
    });
});

describe("convertPayrollData", () => {
    it("should format the amountPaid field correctly for each report", () => {
        const payrollData = {
            report1: { amountPaid: 1500.5, employeeName: "John Doe" },
            report2: { amountPaid: 2500.75, employeeName: "Jane Smith" },
        };
        const result = convertPayrollData(payrollData);
        expect(result).toEqual([
            { amountPaid: "$1500.50", employeeName: "John Doe" },
            { amountPaid: "$2500.75", employeeName: "Jane Smith" },
        ]);
    });

    it("should handle reports with amountPaid as a whole number", () => {
        const payrollData = {
            report1: { amountPaid: 1500, employeeName: "John Doe" },
        };
        const result = convertPayrollData(payrollData);
        expect(result).toEqual([
            { amountPaid: "$1500.00", employeeName: "John Doe" },
        ]);
    });
});
