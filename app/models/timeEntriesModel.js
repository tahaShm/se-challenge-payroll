import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizer.js";

const TimeEntriesModel = sequelize.define(
    "time_entries",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        report_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        entry_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        hours_worked: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        employee_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        job_group: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

TimeEntriesModel.associate = function (models) {
    if (models) {
        TimeEntriesModel.belongsTo(models.JobGroupModel, {
            foreignKey: "job_group",
        });
        TimeEntriesModel.belongsTo(models.ReportModel, {
            foreignKey: "report_id",
        });
    }
};

export default TimeEntriesModel;
