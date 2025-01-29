import express from "express";
import { initializeDB } from "./app/models/initializer.js";
import reportRoutes from "./app/routes/reportRoutes.js";
import uploadRoutes from "./app/routes/uploadRoutes.js";

const app = express();

await initializeDB();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/upload", uploadRoutes);
app.use("/api/report", reportRoutes);
// app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
