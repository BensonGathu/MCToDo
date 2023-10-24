import express from "express";
import * as http from "http";
import { setupSocket } from "./utils/socketIO";
import userRoutes from "./routes/authRoutes";

import taskRoutes from "./routes/taskRoutes";

const app = express();

const cors = require("cors");
app.use(express.json());
app.use(cors());
app.options("*", cors());

const server = http.createServer(app);
const io = setupSocket(server);

app.use(`/api/auth`, userRoutes);
app.use(`/api/tasks`, taskRoutes);
export { server, io };
