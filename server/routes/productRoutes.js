const express = require("express");
const router = express.Router();
const {
    initializeDatabase,
    listTransactions,
    getStatistics,
} = require("../controllers/productController");

// API routes
router.get("/initialize", initializeDatabase);
router.get("/transactions", listTransactions);
router.get("/statistics", getStatistics);

module.exports = router;
