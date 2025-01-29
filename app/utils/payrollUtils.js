const convertPayrollData = (payrollData) => {
    return Object.values(payrollData).map((report) => ({
        ...report,
        amountPaid: `$${report.amountPaid.toFixed(2)}`,
    }));
};

export { convertPayrollData };
