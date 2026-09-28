
const Transaction = require("../models/Transaction");

const getAllTransactions = async () => {
    const transactions = await Transaction.find()
        .sort({ date: -1 })
        .lean();

    return transactions.map(transaction => ({
        ...transaction,
        id: transaction.transactionId,
        type: transaction.type.toUpperCase()
    }));
};

const getTransactionById = async (id) => {
    const transaction = await Transaction.findOne({
        transactionId: id
    }).lean();

    if (!transaction) {
        return null;
    }

    return {
        ...transaction,
        id: transaction.transactionId,
        type: transaction.type.toUpperCase()
    };
};

module.exports = {
    getAllTransactions,
    getTransactionById
};