import mongoose from "mongoose";

export const connectDB = async () => {
  console.log(process.env.DATABASE_URL);
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      authSource: "admin",
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
