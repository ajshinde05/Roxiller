import React, { useEffect, useState } from "react";
import axios from "axios";

const Statistics = ({ month }) => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        fetchStatistics();
    }, [month]);

    const fetchStatistics = async () => {
        const response = await axios.get(
            `http://localhost:5000/api/products/statistics?month=${month}`
        );
        setStats(response.data);
    };

    return (
        <div>
            <h3>Statistics for {month}</h3>
            <p>Total Sale Amount: {stats.totalSaleAmount}</p>
            <p>Sold Items: {stats.soldItems}</p>
            <p>Unsold Items: {stats.unsoldItems}</p>
        </div>
    );
};

export default Statistics;
