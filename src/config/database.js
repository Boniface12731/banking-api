
const mongoose = require("mongoose");
const dns = require("node:dns");

// Workaround for the local Windows DNS resolution issue
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        await mongoose.connect(
            `${process.env.MONGODB_URI}/banking`
        );

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};

module.exports = connectDB;