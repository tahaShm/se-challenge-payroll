import express from "express";
import syncAllModels from "./app/models/index.js";
import sequelize from "./app/config/sequelizer.js";
import dotenv from "dotenv";

const app = express();

// initialize database
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database: ", error);
    });

const port = process.env.PORT || 8080;

await syncAllModels();

app.use(express.json());
app.use("/api/upload", require("./app/routes/uploadRoutes"));
// app.use("/api/report", require("./app/routes/reportRoutes"));
// app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
