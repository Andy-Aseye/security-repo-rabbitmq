// index.js
import express from "express";
import dotenv from "dotenv";
import cveRoute from "./routes/cve.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToRabbitMQ } from "./utils/rabbitMQ.js";

dotenv.config();
const app = express();
const port = 8081;

let channel; // Declare a variable for the RabbitMQ channel

async function startServer() {
  ({ channel } = await connectToRabbitMQ()); // Ensure that channel is obtained from connectToRabbitMQ

  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(cookieParser());
  app.use(express.json());

  app.use("/api/cve", cveRoute(channel)); // Pass the channel to the route

  app.listen(port, () => {
    console.log(`API Service listening on port: ${port}`);
  });
}

startServer();

export { channel }; // Export the channel if needed elsewhere
