import asyncHandler from "express-async-handler";
import TimeEntriesDTO from "../models/dto/timeEntriesDTO.js";
import JobGroupDTO from "../models/dto/jobGroupDTO.js";

const getPayrollReport = asyncHandler(async (req, res) => {
    try {
        // Fetch all time entries
        const timeEntries = await TimeEntriesDTO.findAll();

        if (!timeEntries || timeEntries.length === 0) {
            return res
                .status(200)
                .json({ payrollReport: { employeeReports: [] } });
        }

        // Define helper function to determine pay period
        const getPayPeriod = (date) => {
            const entryDate = new Date(date);
            const year = entryDate.getFullYear();
            const month = entryDate.getMonth() + 1;
            const startDate =
                entryDate.getDate() <= 15
                    ? `${year}-${month.toString().padStart(2, "0")}-01`
                    : `${year}-${month.toString().padStart(2, "0")}-16`;
            const endDate =
                entryDate.getDate() <= 15
                    ? `${year}-${month.toString().padStart(2, "0")}-15`
                    : `${year}-${month.toString().padStart(2, "0")}-${new Date(
                          year,
                          month,
                          0
                      ).getDate()}`;
            return { startDate, endDate };
        };

        // Group records by employee and pay period
        const payrollData = {};

        for (const entry of timeEntries) {
            const { employee_id, hours_worked, entry_date, job_group } = entry;
            const payPeriod = getPayPeriod(entry_date);
            const periodKey = `${employee_id}-${payPeriod.startDate}`;

            // Fetch hourly rate for job group
            const jobGroup = await JobGroupDTO.findOne({
                where: { job_group },
            });
            if (!jobGroup) continue;
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

        // Convert payroll data to array and format amountPaid
        const employeeReports = Object.values(payrollData).map((report) => ({
            ...report,
            amountPaid: `$${report.amountPaid.toFixed(2)}`,
        }));

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
        res.status(500).json({ message: error.message });
    }
});

export { getPayrollReport };
