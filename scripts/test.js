const contract = await ethers.getContractAt("SmartMeter", "your-contract-address");

// Set a price
await contract.setPrice(Math.floor(Date.now() / 1000), ethers.utils.parseEther("0.0001"));

// Record data
await contract.recordData(1, 10, Math.floor(Date.now() / 1000));

// Fetch data
const data = await contract.getMeterData(1);
console.log(data);
