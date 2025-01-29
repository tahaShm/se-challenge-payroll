import JobGroupDTO from "../models/dto/jobGroupDTO.js";
import { ERRORS } from "../resources/constants.js";

const checkJobGroupValidity = async (jobGroupName) => {
    const validJobGroup = await JobGroupDTO.findOne({
        where: { job_group: jobGroupName },
    });

    return validJobGroup;
};

export { checkJobGroupValidity };
