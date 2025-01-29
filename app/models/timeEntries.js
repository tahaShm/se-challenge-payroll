import TimeEntriesDTO from "./dto/timeEntriesDTO.js";

const createNewTimeEntry = async (reportId, entry_date, record) => {
    await TimeEntriesDTO.create({
        report_id: reportId,
        employee_id: record["employee id"],
        entry_date: entry_date,
        job_group: record["job group"],
        hours_worked: record["hours worked"],
    });
};

export { createNewTimeEntry };
