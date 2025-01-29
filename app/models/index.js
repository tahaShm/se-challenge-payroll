// models/index.js

import sequelize from "../config/sequelizer.js"; // Your Sequelize instance
import ReportModel from "./reportModel.js";
import JobGroupModel from "./jobGroupModel.js";
import TimeEntriesModel from "./timeEntriesModel.js";

// Put all your models in an array (for ease of use later if needed)
const models = {
    ReportModel,
    JobGroupModel,
    TimeEntriesModel
};

// Sync all models
const syncAllModels = async () => {
    try {
        // Sync all models (check if tables exist, and create them if not)
        await sequelize.sync({ force: false }); // Use { force: false } to avoid dropping tables
        console.log("All tables are synchronized.");
    } catch (error) {
        console.error("Error synchronizing tables:", error);
    }
};

export default syncAllModels;
