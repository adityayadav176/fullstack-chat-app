import mongoose from "mongoose";

mongoose.connection.on("error", (err) => {
    console.error(`MongoDB connection error: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB connection lost. Attempting reconnect...");
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB connection established.");
});

export default async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
}