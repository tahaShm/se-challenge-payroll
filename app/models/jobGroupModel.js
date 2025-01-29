import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizer.js";

const JobGroupModel = sequelize.define(
    "job_groups",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        job_group: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hourly_rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);  

export default JobGroupModel;