
const transactionService = require("../services/transactionService");

const getTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.getAllTransactions();

        res.json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error.message);

        res.status(500).json({
            message: "Failed to fetch transactions"
        });
    }
};

const getTransactionById = async (req, res) => {
    try {
        const transaction = await transactionService.getTransactionById(
            req.params.id
        );

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        res.json(transaction);
    } catch (error) {
        console.error("Error fetching transaction:", error.message);

        res.status(500).json({
            message: "Failed to fetch transaction"
        });
    }
};

module.exports = {
    getTransactions,
    getTransactionById
};