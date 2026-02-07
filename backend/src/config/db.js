import mongoose from "mongoose";

export async function connectDB() {
    try {
        const connections = await mongoose.connect(process.env.MONGO_URI);
        console.log(`🗄️ MongoDB connected: ${connections.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection failed");
        console.error(error.message);
        process.exit(1);
    }
};
