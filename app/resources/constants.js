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
    INVALID_JOB_GROUP: "Invalid job group: ",
    DUPLICATE_REPORT_ID: "Duplicate report ID: ",
    CSV_PROCESSING_ERROR: "Error processing CSV file: ",
    INTERNAL_SERVER_ERROR: "Internal server error",
};

const SUCCESSES = {
    FILE_UPLOAD_SUCCESS: "File uploaded successfully.",
};

export { JOB_GROUPS, ERRORS, SUCCESSES };
