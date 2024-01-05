import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/whatsappUsers.routes.js";

const app = express();
app.use(cors());

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/newUser", router);
app.use(
    express.Router().get('/', (req, res) => {
        res.status(200);
        res.json({ sms: "Api en funcionamiento", respuesta: true });
    })
);

export default app;