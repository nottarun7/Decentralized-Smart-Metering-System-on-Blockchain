import { ethers } from "ethers";
import dotenv from 'dotenv';
dotenv.config();

const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`);

// Contract details
const contractAddress = "0x0B8b4BdD87A3A4994d8C205E7b34bC77a2f1Bc63";
const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "meterId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "energyConsumed",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "cost",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "DataRecorded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "PriceUpdated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_meterId",
          "type": "uint256"
        }
      ],
      "name": "getMeterData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "energyConsumed",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "cost",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct SmartMeter.MeterData[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "meterData",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "energyConsumed",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "cost",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "priceHistory",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_meterId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_energyConsumed",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_timestamp",
          "type": "uint256"
        }
      ],
      "name": "recordData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_timestamp",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        }
      ],
      "name": "setPrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
];

// Read-only contract instance
const contract = new ethers.Contract(contractAddress, abi, provider);

// Example functions for interacting with your smart meter contract
export const getMeterData = async (meterId) => {
    try {
        const readings = await contract.getMeterData(meterId);
        return readings;
    } catch (error) {
        console.error("Error fetching meter data:", error);
        throw error;
    }
};

// Function for write operations (requires MetaMask)
export const recordData = async (meterId, energyConsumed, timestamp) => {
    try {
        // Check if MetaMask is installed
        if (!window.ethereum) {
            throw new Error("Please install MetaMask!");
        }

        // Get the signer from MetaMask
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        // Create contract instance with signer
        const contractWithSigner = contract.connect(signer);
        
        // Record the data
        const tx = await contractWithSigner.recordData(meterId, energyConsumed, timestamp);
        await tx.wait();
        
        return true;
    } catch (error) {
        console.error("Error recording data:", error);
        throw error;
    }
};