const authService = require("../services/authService");

const login = (req, res) => {
    const { username, password } = req.body;
    const result = authService.login(username, password);
    res.status(result.statusCode).json(result);
};
module.exports = {
    login
};