
require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./src/config/database");
const Account = require("./src/models/Account");
const accounts = require("./src/data/accounts");

const seedAccounts = async () => {
    try {
        await connectDB();

        for (const account of accounts) {
            await Account.updateOne(
                { accountNumber: account.accountNumber },
                { $setOnInsert: account },
                { upsert: true }
            );
        }

        console.log("Accounts migrated successfully!");

        const savedAccounts = await Account.find();

        console.log(savedAccounts);

    } catch (error) {
        console.error("Migration failed:", error.message);
    } finally {
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
    }
};

seedAccounts();