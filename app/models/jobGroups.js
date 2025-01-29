import JobGroupDTO from "../models/dto/jobGroupDTO.js";
import { ERRORS } from "../resources/constants.js";

const checkJobGroupValidity = async (record) => {
    const jobGroup = await JobGroupDTO.findOne({
        where: { job_group: record["job group"] },
    });

    return jobGroup;
};

export { checkJobGroupValidity };
