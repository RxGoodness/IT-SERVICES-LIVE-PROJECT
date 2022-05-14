import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.NODE_ENV! === "test"
        ? process.env.TEST_MONGO_URI!
        : process.env.MONGO_URI!
    );
    console.log(`🔌 Database connected to ${conn.connection.host}`);
  } catch (err) {
    console.log(`could not connect to mongodb ---- ${err}`);
    process.exit(1);
  }
};

export { connectDB };
