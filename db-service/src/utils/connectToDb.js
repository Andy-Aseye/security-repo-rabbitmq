import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) {
    console.log("connected to db");

    return cached.conn;
  }

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "securitytest",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  if (!cached.conn) {
    console.log("Connection to MongoDB failed");
  }

  console.log("connected to db");

  return cached.conn;
};
