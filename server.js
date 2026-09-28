
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/database");

const transferRoutes = require("./src/routes/transferRoutes");
const transactionRoutes = require("./src/routes/transactionRoutes");
const authRoutes = require("./src/routes/authRoutes");
const accountRoutes = require("./src/routes/accountRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Health check
app.get("/", (req, res) => {
    res.json({
        message: "Equity Banking API is running"
    });
});

// API routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);

// Connect to MongoDB, then start Express
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();