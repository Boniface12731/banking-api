const accounts = require("../data/accounts");

const transferMoney = (fromAccount, toAccount, amount) => {
    const sender = accounts.find(
        account => account.accountNumber === fromAccount
    );

    const receiver = accounts.find(
        account => account.accountNumber === toAccount
    );

    if (!sender) {
        return {
            success: false,
            statusCode: 404,
            message: "Sender account not found"
        };
    }

    if (!receiver) {
        return {
            success: false,
            statusCode: 404,
            message: "Receiver account not found"
        };
    }

    if (amount <= 0) {
        return {
            success: false,
            statusCode: 400,
            message: "Amount must be greater than zero"
        };
    }

    if (sender.balance < amount) {
        return {
            success: false,
            statusCode: 400,
            message: "Insufficient balance"
        };
    }

    sender.balance -= amount;
    receiver.balance += amount;

    return {
        success: true,
        statusCode: 200,
        message: "Transfer successful",
        transfer: {
            fromAccount,
            toAccount,
            amount
        }
    };
};

module.exports = {
    transferMoney
};