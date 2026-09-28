const mongoose = require("mongoose");
const { randomUUID } = require("node:crypto");

const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

const transferMoney = async (fromAccount, toAccount, amount) => {
    // Validate the input
    if (
        typeof fromAccount !== "string" ||
        typeof toAccount !== "string" ||
        !fromAccount.trim() ||
        !toAccount.trim()
    ) {
        return {
            success: false,
            statusCode: 400,
            message: "Sender and receiver account numbers are required"
        };
    }

    const transferAmount = Number(amount);

    if (!Number.isFinite(transferAmount) || transferAmount <= 0) {
        return {
            success: false,
            statusCode: 400,
            message: "Amount must be greater than zero"
        };
    }

    if (fromAccount === toAccount) {
        return {
            success: false,
            statusCode: 400,
            message: "Cannot transfer to the same account"
        };
    }

    // Generate IDs once, outside the transaction callback.
    const transferId = randomUUID();

    const debitTransactionId = `TXN-${randomUUID()}`;
    const creditTransactionId = `TXN-${randomUUID()}`;

    const session = await mongoose.startSession();

    try {
        let transferResult;

        await session.withTransaction(async () => {
            // Check that both accounts exist.
            const senderExists = await Account.findOne({
                accountNumber: fromAccount
            }).session(session);

            if (!senderExists) {
                const error = new Error("Sender account not found");
                error.statusCode = 404;
                throw error;
            }

            const receiverExists = await Account.findOne({
                accountNumber: toAccount
            }).session(session);

            if (!receiverExists) {
                const error = new Error("Receiver account not found");
                error.statusCode = 404;
                throw error;
            }

            // Debit the sender only if sufficient funds exist.
            const sender = await Account.findOneAndUpdate(
                {
                    accountNumber: fromAccount,
                    balance: { $gte: transferAmount }
                },
                {
                    $inc: { balance: -transferAmount }
                },
                {
                    new: true,
                    session
                }
            );

            if (!sender) {
                const error = new Error("Insufficient balance");
                error.statusCode = 400;
                throw error;
            }

            // Credit the recipient.
            const receiver = await Account.findOneAndUpdate(
                { accountNumber: toAccount },
                {
                    $inc: { balance: transferAmount }
                },
                {
                    new: true,
                    session
                }
            );

            if (!receiver) {
                const error = new Error("Receiver account not found");
                error.statusCode = 404;
                throw error;
            }

            const transferDate = new Date();

            // Create the sender's debit record.
            await Transaction.create(
                [
                    {
                        transactionId: debitTransactionId,
                        accountNumber: fromAccount,
                        type: "debit",
                        description: `Transfer to ${toAccount}`,
                        amount: transferAmount,
                        date: transferDate,
                        status: "SUCCESS"
                    }
                ],
                { session }
            );

            // Create the recipient's credit record.
            await Transaction.create(
                [
                    {
                        transactionId: creditTransactionId,
                        accountNumber: toAccount,
                        type: "credit",
                        description: `Transfer from ${fromAccount}`,
                        amount: transferAmount,
                        date: transferDate,
                        status: "SUCCESS"
                    }
                ],
                { session }
            );

            transferResult = {
                success: true,
                statusCode: 200,
                message: "Transfer successful",
                transfer: {
                    transferId,
                    fromAccount,
                    toAccount,
                    amount: transferAmount,
                    debitTransactionId,
                    creditTransactionId
                }
            };
        });

        return transferResult;

    } catch (error) {
        if (error.statusCode) {
            return {
                success: false,
                statusCode: error.statusCode,
                message: error.message
            };
        }

        console.error("Transfer failed:", error.message);
        throw error;

    } finally {
        await session.endSession();
    }
};

module.exports = {
    transferMoney
};