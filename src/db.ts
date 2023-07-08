import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async () => {
  try {
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) throw new Error("DB_URL not specified");
    await mongoose.connect(dbUrl);
    console.log("[SUCCESS] Connected to MongoDB");
  } catch (err) {
    console.log("[ERROR] Failed to connect to MongoDB: ", err);
    process.exit(1);
  }
};

export default connectDB;
