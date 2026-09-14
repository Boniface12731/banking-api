const transactions = require("../data/transactions");

const getAllTransactions = () => {
    return transactions;
};

const getTransactionById = (id) => {
    return transactions.find(
        (transaction) => transaction.id === id
    );
};

module.exports = {
    getAllTransactions,
    getTransactionById
};