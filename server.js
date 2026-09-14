const express = require("express");
const cors = require("cors");
const transferRoutes = require("./src/routes/transferRoutes");
const transactionRoutes = require("./src/routes/transactionRoutes");
const authRoutes = require("./src/routes/authRoutes");
 
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        message: "Equity Banking API is running"
    });
});

app.use("/api/transactions", transactionRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});