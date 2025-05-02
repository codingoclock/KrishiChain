const hre = require("hardhat");

async function main() {
  console.log("Deploying KrishiChain contract...");

  // Get the contract factory
  const KrishiChain = await hre.ethers.getContractFactory("KrishiChain");

  // Deploy the contract
  const krishiChain = await KrishiChain.deploy();

  // Wait for deployment to finish
  await krishiChain.waitForDeployment();

  const address = await krishiChain.getAddress();
  console.log("KrishiChain deployed to:", address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
