import mongoose from "mongoose"

const database_userName = process.env.DATABASE_USERNAME as string;
const database_password = process.env.DATABASE_PASSWORD as string;
const database_name = process.env.DATABASE_NAME as string;

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${database_userName}:${database_password}@cluster0.ymwz0.mongodb.net/${database_name}?retryWrites=true&w=majority`)
        console.log('mongodb is live....')
    } catch (err) {
        console.log(`could not connect to mongodb ---- ${err}`)
    }
}

export {connectDB}