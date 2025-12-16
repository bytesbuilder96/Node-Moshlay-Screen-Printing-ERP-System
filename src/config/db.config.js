import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const DB_URL = process.env.DB_URL;
    if (!DB_URL) {
      throw new Error("DB_URL is not defined in environment variables.");
    }
    const connectionInstance = await mongoose.connect(DB_URL);
    console.log(
      `Database Connected successfuly with host || ${connectionInstance.connection.host} `
    );
  } catch (error) {
    console.log("database not conneted ");
  }
};
