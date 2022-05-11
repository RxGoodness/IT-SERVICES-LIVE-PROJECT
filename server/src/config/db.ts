import mongoose from "mongoose";

const connectDB = async () => {
  const test = process.env.MONGO_URI as string;
  console.log(test)
  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI as string);
    // console.log(`🔌 Database connected to ${conn.connection.host}`);
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
