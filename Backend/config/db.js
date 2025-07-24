import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongoose connected");
  } catch (error) {
    console.log("Mongoose connection error", error);
  }
};

export default connectToDB;
