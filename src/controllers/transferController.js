const transferService = require("../services/transferService");

const createTransfer = async (req, res) => {
    try {
        const {
            fromAccount,
            toAccount,
            amount
        } = req.body;

        const result = await transferService.transferMoney(
            fromAccount,
            toAccount,
            amount
        );

        res.status(result.statusCode).json(result);

    } catch (error) {
        console.error("Transfer controller error:", error.message);
        res.status(500).json({
            success: false,
            message: "Transfer failed. Please try again."
        });
    }
};

module.exports = {
    createTransfer
};