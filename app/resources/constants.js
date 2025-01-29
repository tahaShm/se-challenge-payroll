const JOB_GROUPS = {
    A: {
        hourly_rate: 20,
    },
    B: {
        hourly_rate: 30,
    },
};

const ERRORS = {
    INVALID_FILE: "Invalid file.",
    INVALID_CSV_FILE_NAME: "Invalid CSV file: missing ReportID",
    INVALID_JOB_GROUP: "record with this job group does not exist: ",
    DUPLICATE_REPORT_ID: "Duplicate report ID: ",
    CSV_PROCESSING_ERROR: "Error processing CSV file: ",

    INVALID_JOB_GROUP: "Invalid job group",
    INVALID_HOUR: "Invalid hour",
    INVALID_HOURS_WORKED: "Invalid hours worked",
    INVALID_DATE: "Invalid date",
    INVALID_DATE_INTERVAL: "Invalid date interval",
    INVALID_PAY_PERIOD: "Invalid pay period",
    INVALID_PAY_PERIOD_START: "Invalid pay period start",
    INVALID_PAY_PERIOD_END: "Invalid pay period end",
    INVALID_PAY_PERIOD_START_END: "Invalid pay period start and end",
    INVALID_PAY_PERIOD_START_END_INTERVAL:
        "Invalid pay period start and end interval",
};

const SUCCESSES = {
    FILE_UPLOAD_SUCCESS: "File uploaded successfully.",
};

export { JOB_GROUPS, ERRORS, SUCCESSES };
