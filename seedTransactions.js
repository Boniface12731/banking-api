
require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./src/config/database");
const Transaction = require("./src/models/Transaction");
const transactions = require("./src/data/transactions");

const seedTransactions = async () => {
    try {
        await connectDB();

        for (const transaction of transactions) {
            const transactionData = {
                transactionId: transaction.id,
                accountNumber: transaction.accountNumber,
                type: transaction.type.toLowerCase(),
                description: transaction.description,
                amount: transaction.amount,
                date: new Date(transaction.date),
                status: transaction.status
            };

            await Transaction.updateOne(
                { transactionId: transaction.id },
                { $setOnInsert: transactionData },
                { upsert: true }
            );
        }

        console.log("Transactions migrated successfully!");

        const savedTransactions = await Transaction.find({
            accountNumber: "123456789"
        });

        console.log(savedTransactions);

    } catch (error) {
        console.error("Transaction migration failed:", error.message);
    } finally {
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
    }
};

seedTransactions();