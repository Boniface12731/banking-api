const express =require("express")

const {
    getAccountByNumber
} = require("../controllers/accountController")

const router = express.Router();
router.get("/:accountNumber", getAccountByNumber);

module.exports = router;
