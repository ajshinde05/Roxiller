import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchTransactions();
    }, [search, page]);

    const fetchTransactions = async () => {
        const response = await axios.get(
            `http://localhost:5000/api/products/transactions?search=${search}&page=${page}`
        );
        setTransactions(response.data);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((txn) => (
                        <tr key={txn._id}>
                            <td>{txn.title}</td>
                            <td>{txn.description}</td>
                            <td>{txn.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => setPage(page - 1)}>Previous</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
};

export default TransactionTable;
