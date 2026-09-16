const accounts = require("../data/accounts");

const getAccountByNumber = (req, res) => {
    const account = accounts.find(
        account => account.accountNumber === req.params.accountNumber
    );

    if(!account){
        return res.status(404).json({
            message :"Account Not Found"
        });
    }
    res.json(account);
};

    module.exports = {
        getAccountByNumber
    }