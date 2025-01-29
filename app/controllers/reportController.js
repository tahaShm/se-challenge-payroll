import asyncHandler from "express-async-handler";
import { fetchAllTimeEntries } from "../models/timeEntries.js";
import { checkJobGroupValidity } from "../models/jobGroups.js";
import { getPayPeriod } from "../utils/dateUtils.js";
import { convertPayrollData } from "../utils/payrollUtils.js";
import { ERRORS } from "../resources/constants.js";

const getPayrollReport = asyncHandler(async (req, res) => {
    try {
        const timeEntries = await fetchAllTimeEntries();

        if (!timeEntries || timeEntries.length === 0) {
            return res
                .status(200)
                .json({ payrollReport: { employeeReports: [] } });
        }

        // Group records by employee and pay period
        const payrollData = {};

        for (const entry of timeEntries) {
            const { employee_id, hours_worked, entry_date, job_group } = entry;
            const payPeriod = getPayPeriod(entry_date);
            const periodKey = `${employee_id}-${payPeriod.startDate}`;

            const jobGroup = await checkJobGroupValidity(job_group);
            if (!jobGroup) {
                res.status(400);
                throw new Error(ERRORS.INVALID_JOB_GROUP + job_group);
            }

            const hourlyRate = jobGroup.hourly_rate;

            if (!payrollData[periodKey]) {
                payrollData[periodKey] = {
                    employeeId: employee_id,
                    payPeriod: payPeriod,
                    amountPaid: 0,
                };
            }

            payrollData[periodKey].amountPaid += hours_worked * hourlyRate;
        }

        const employeeReports = convertPayrollData(payrollData);

        // Sort by employee ID and pay period start date
        employeeReports.sort((a, b) => {
            if (a.employeeId !== b.employeeId) {
                return a.employeeId - b.employeeId;
            }
            return (
                new Date(a.payPeriod.startDate) -
                new Date(b.payPeriod.startDate)
            );
        });

        res.status(200).json({ payrollReport: { employeeReports } });
    } catch (error) {
        if (!res.headersSent) {
            res.status(res.statusCode !== 200 ? res.statusCode : 500).json({
                error:
                    res.statusCode !== 500
                        ? error.message
                        : ERRORS.INTERNAL_SERVER_ERROR,
            });
        }
    }
});

export { getPayrollReport };
