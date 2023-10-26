import express from "express";
import * as http from "http";
import { setupSocket } from "./utils/socketIO";
import userRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for your application.
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.options("*", cors());

// Create an HTTP server and set up a WebSocket server using 'socketIO'.
const server = http.createServer(app);
const io = setupSocket(server);

// Use the 'userRoutes' for handling user-related API routes.
app.use(`/api/auth`, userRoutes);

// Use the 'taskRoutes' for handling task-related API routes.
app.use(`/api/tasks`, taskRoutes);

export { server, io };
