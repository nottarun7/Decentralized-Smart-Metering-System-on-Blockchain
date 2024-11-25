import React from "react";
import "./App.css";
import MeterData from "./components/MeterData";
import RecordData from "./components/RecordData";
import SetPrice from "./components/SetPrice";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Blockchain Smart Meter</h1>
            </header>
            <main>
                <MeterData />
                <RecordData />
                <SetPrice />
            </main>
        </div>
    );
}

export default App;
