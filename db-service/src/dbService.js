import dotenv from "dotenv";
import { connectToDatabase } from "./utils/connectToDb.js";
import { connectToRabbitMQ } from "./utils/rabbitMQ.js";
import { handleDatabaseOperations } from "./utils/databaseOperations.js";

dotenv.config();

async function startDbService() {
  await connectToDatabase();
  const channel = await connectToRabbitMQ();
  handleDatabaseOperations(channel);
}

startDbService();
