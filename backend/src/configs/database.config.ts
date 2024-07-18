import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connection successful");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};
