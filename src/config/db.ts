import mongoose from "mongoose";

export const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/');
        console.info('MongoDB connected successfully');
    } catch (error: any) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}