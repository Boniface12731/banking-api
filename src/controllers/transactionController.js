const transactionService = require("../services/transactionService");

const getTransactions = (req, res) => {
    const transactions = transactionService.getAllTransactions();

    res.json(transactions);
};

const getTransactionById = (req, res) => {
    const transaction = transactionService.getTransactionById(
        req.params.id
    );

    if (!transaction) {
        return res.status(404).json({
            message: "Transaction not found"
        });
    }

    res.json(transaction);
};

module.exports = {
    getTransactions,
    getTransactionById
};