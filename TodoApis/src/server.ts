import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import Redis from "ioredis";
import { server as app } from "./app";
const port = process.env.PORT;

// Initialize Redis for caching (Optional)
// const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: 6379,
//   password: process.env.REDIS_PW,
// });

// redis.on("error", (error) => {
//   console.error("Redis connection error:", error);
// });

// Connect to MongoDB using Mongoose
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;

// Handle MongoDB connection errors
database.on("error", (error) => {
  console.log(error);
});

// Once MongoDB is connected, log the success message
database.once("connected", () => {
  console.log("Database Connected");
});

// Start the Express server on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
