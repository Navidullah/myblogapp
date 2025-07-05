import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const ConnectDB = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("db connected");
};
