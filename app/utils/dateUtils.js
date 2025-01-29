const convertStrToDate = (str) => {
    const [day, month, year] = str.split("/");
    return new Date(`${year}-${month}-${day}`);
};

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

export { convertStrToDate, getPayPeriod };
