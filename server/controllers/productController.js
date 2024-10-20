const Product = require("../models/product");
const axios = require("axios");

// Seed the database with product data from the external API
const initializeDatabase = async (req, res) => {
    try {
        const response = await axios.get(
            "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
        );
        await Product.deleteMany(); // Clear existing data
        await Product.insertMany(response.data); // Seed data
        res.status(200).send("Database initialized successfully");
    } catch (error) {
        res.status(500).json({ message: "Error initializing database", error });
    }
};

// List products with search & pagination
const listTransactions = async (req, res) => {
    const { search = "", page = 1, perPage = 10 } = req.query;
    const query = {
        $or: [
            { title: new RegExp(search, "i") },
            { description: new RegExp(search, "i") },
        ],
    };
    const products = await Product.find(query)
        .skip((page - 1) * perPage)
        .limit(Number(perPage));
    res.json(products);
};

// Statistics API
const getStatistics = async (req, res) => {
    const { month } = req.query;
    const start = new Date(`2022-${month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const totalSaleAmount = await Product.aggregate([
        { $match: { dateOfSale: { $gte: start, $lt: end }, sold: true } },
        { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    const soldItems = await Product.countDocuments({
        dateOfSale: { $gte: start, $lt: end },
        sold: true,
    });

    const unsoldItems = await Product.countDocuments({
        dateOfSale: { $gte: start, $lt: end },
        sold: false,
    });

    res.json({
        totalSaleAmount: totalSaleAmount[0]?.total || 0,
        soldItems,
        unsoldItems,
    });
};
