import React, { useState } from "react";
import { recordData } from "../interaction";

const RecordData = () => {
    const [meterId, setMeterId] = useState("");
    const [energyConsumed, setEnergyConsumed] = useState("");
    const [timestamp, setTimestamp] = useState("");

    const handleSubmit = async () => {
        try {
            const success = await recordData(meterId, energyConsumed, timestamp);
            if (success) alert("Data recorded successfully!");
        } catch (error) {
            console.error("Error recording data:", error);
        }
    };

    return (
        <div>
            <h2>Record Meter Data</h2>
            <input
                type="text"
                placeholder="Meter ID"
                value={meterId}
                onChange={(e) => setMeterId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Energy Consumed"
                value={energyConsumed}
                onChange={(e) => setEnergyConsumed(e.target.value)}
            />
            <input
                type="text"
                placeholder="Timestamp"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
            />
            <button onClick={handleSubmit}>Record Data</button>
        </div>
    );
};

export default RecordData;
