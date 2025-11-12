import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGO_URL = process.env.MONGOOS_URL;
    if (!MONGO_URL) {
      throw new Error("❌ MONGOOS_URL is missing in .env");
    }

    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Stop server if DB fails
  }
};

export default connectDB;
