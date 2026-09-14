const users = require("../data/users");

const login = (username, password) => {
    const user = users.find(
        user =>
            user.username === username &&
            user.password === password
    );

    if (!user) {
        return {
            success: false,
            statusCode: 401,
            message: "Invalid username or password"
        };
    }

    return {
        success: true,
        statusCode: 200,
        message: "Login successful",
        user: {
            id: user.id,
            username: user.username,
            name: user.name,
            accountNumber: user.accountNumber
        }
    };
};

module.exports = {
    login
};