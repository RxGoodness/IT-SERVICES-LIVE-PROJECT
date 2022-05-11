require("dotenv").config();
const mongoose = require("mongoose");

beforeAll(async () => {
    await mongoose.connect(
        process.env.NODE_ENV! === "test" ? process.env.TEST_MONGO_URI! : process.env.MONGO_URI!
    );
});
afterAll(async () => {
    const collections = await mongoose.connection.db.collections();
    collections.map(async (collection: any) => {
        await collection.deleteMany({});
    })
})