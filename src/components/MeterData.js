import React, { useState } from "react";
import { getMeterData } from "../interaction";

const MeterData = () => {
    const [meterId, setMeterId] = useState("");
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const result = await getMeterData(meterId);
            setData(result);
        } catch (error) {
            console.error("Error fetching meter data:", error);
        }
    };

    return (
        <div>
            <h2>Fetch Meter Data</h2>
            <input
                type="text"
                placeholder="Enter Meter ID"
                value={meterId}
                onChange={(e) => setMeterId(e.target.value)}
            />
            <button onClick={fetchData}>Fetch Data</button>
            <div>
                {data.length > 0 ? (
                    <ul>
                        {data.map((entry, index) => (
                            <li key={index}>
                                Energy Consumed: {entry.energyConsumed}, Cost: {entry.cost}, Timestamp:{" "}
                                {new Date(entry.timestamp * 1000).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No data to display</p>
                )}
            </div>
        </div>
    );
};

export default MeterData;
