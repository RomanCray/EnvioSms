import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/whatsappUsers.routes.js";

const app = express();
app.use(cors());

// Settings
app.set("port",4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/newUser", router);

export default app;