import express from "express";
import * as http from "http";
import { setupSocket } from "./utils/socketIO";

const app = express();

const cors = require("cors");
app.use(express.json());
app.use(cors());
app.options("*", cors());

const version = process.env.VERSION;
const server = http.createServer(app);
const io = setupSocket(server);

export { server, io };
