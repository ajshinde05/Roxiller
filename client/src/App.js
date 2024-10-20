import React, { useState } from "react";
import TransactionTable from "./components/TransactionTable";
import Statistics from "./components/Statistics";

function App() {
  const [month, setMonth] = useState("3");

  return (
    <div>
      <select onChange={(e) => setMonth(e.target.value)} value={month}>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>
      <TransactionTable />
      <Statistics month={month} />
    </div>
  );
}

export default App;
