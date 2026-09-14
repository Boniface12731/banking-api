const transferService = require("../services/transferService");

const createTransfer = (req, res) => {
    const {
        fromAccount,
        toAccount,
        amount
    } = req.body;

    const result = transferService.transferMoney(
        fromAccount,
        toAccount,
        amount
    );

    res.status(result.statusCode).json(result);
};

module.exports = {
    createTransfer
};