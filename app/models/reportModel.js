import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizer.js";

const ReportModel = sequelize.define(
    "report",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        report_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        uploaded_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

// Ensure that the table is created if it doesn't already exist
sequelize
    .sync({ force: false })
    .then(() => {
        console.log("Tables synchronized!");
    })
    .catch((err) => {
        console.error("Error synchronizing tables:", err);
    });

export default ReportModel;
