
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        transactionId: {
            type: String,
            required: true,
            unique: true
        },

        accountNumber: {
            type: String,
            required: true
        },

        type: {
            type: String,
            enum: ["debit", "credit"],
            required: true
        },

        description: {
            type: String,
            required: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        date: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ["SUCCESS", "PENDING", "FAILED"],
            default: "SUCCESS"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Transaction",
    transactionSchema
);