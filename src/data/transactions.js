const transactions = [
    {
        id: "TXN001",
        type: "DEBIT",
        description: "M-Pesa Payment",
        amount: 1500,
        date: "2026-09-08T10:30:00",
        status: "SUCCESS"
    },
    {
        id: "TXN002",
        type: "CREDIT",
        description: "Salary",
        amount: 85000,
        date: "2026-09-07T09:00:00",
        status: "SUCCESS"
    },
    {
        id: "TXN003",
        type: "DEBIT",
        description: "Supermarket Purchase",
        amount: 4500,
        date: "2026-09-06T16:45:00",
        status: "SUCCESS"
    },
    {
        id: "TXN004",
        type: "DEBIT",
        description: "Electricity Token",
        amount: 2000,
        date: "2026-09-05T14:20:00",
        status: "SUCCESS"
    }
];

module.exports = transactions;