async function main() {
    const SmartMeter = await ethers.getContractFactory("SmartMeter");
    console.log("Deploying SmartMeter contract...");

    const contract = await SmartMeter.deploy(); // Deploy contract
    console.log("Waiting for deployment to complete...");

    await contract.waitForDeployment(); // Wait for deployment
    const address = await contract.getAddress(); // Get contract address

    console.log("Contract deployed successfully at:", address);
}

main().catch((error) => {
    console.error("Error during deployment:", error);
    process.exitCode = 1;
});
