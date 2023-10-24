import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import Redis from "ioredis";
import { server as app } from "./app";
const port = process.env.PORT;

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379,
  password: process.env.REDIS_PW,
});

redis.on("error", (error) => {
  console.error("Redis connection error:", error);
});

const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
