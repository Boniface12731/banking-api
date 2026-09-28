const Account = require("../models/Account");
const accounts = require("../models/Account");

const getAccountByNumber = async (req, res) => {
    try{
        const account = await Account.findOne({
            accountNumber: req.params.accountNumber
        });

        if(!account){
            return res.status(404).json({
                 message: "Account Not Found"
            });
        }
        res.json(account);
    }catch(error){
        console.error("Error fetching account:", error.message);
        res.status(500).json({
            message: "Failed to fetch account"
        });
    }
 };

    module.exports = {
        getAccountByNumber
    };