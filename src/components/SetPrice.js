import React, { useState } from "react";
import { ethers } from "ethers";

const SetPrice = () => {
    const [price, setPrice] = useState("");

    const handleSetPrice = async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed!");
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const abi = [
                {
                    inputs: [
                        { internalType: "uint256", name: "_timestamp", type: "uint256" },
                        { internalType: "uint256", name: "_price", type: "uint256" },
                    ],
                    name: "setPrice",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
            ];

            const contractAddress = "0xYourContractAddress";
            const contract = new ethers.Contract(contractAddress, abi, signer);

            const tx = await contract.setPrice(Math.floor(Date.now() / 1000), price);
            await tx.wait();
            alert("Price updated successfully!");
        } catch (error) {
            console.error("Error setting price:", error);
        }
    };

    return (
        <div>
            <h2>Set Price</h2>
            <input
                type="text"
                placeholder="New Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button onClick={handleSetPrice}>Update Price</button>
        </div>
    );
};

export default SetPrice;
