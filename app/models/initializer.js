import sequelize from "../config/sequelizer.js";
import JobGroupDTO from "./dto/jobGroupDTO.js";
import { JOB_GROUPS } from "../resources/constants.js";

const authenticate = async () => {
    sequelize.authenticate();
};

const syncAllModels = async () => {
    await sequelize.sync({ force: false });
};

const initializeJobGroups = async () => {
    const jobGroupA = await JobGroupDTO.findOne({
        where: { job_group: "A" },
    });
    const jobGroupB = await JobGroupDTO.findOne({
        where: { job_group: "B" },
    });
    if (!jobGroupA) {
        await JobGroupDTO.create({
            job_group: "A",
            hourly_rate: JOB_GROUPS.A.hourly_rate,
        });
    }
    if (!jobGroupB) {
        await JobGroupDTO.create({
            job_group: "B",
            hourly_rate: JOB_GROUPS.B.hourly_rate,
        });
    }
};

const initializeDB = async () => {
    try {
        await authenticate();
        await syncAllModels();
        await initializeJobGroups();
    } catch (error) {
        console.error("Error initializing database:", error);
    }
};

export { initializeDB };
