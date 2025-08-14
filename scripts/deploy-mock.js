const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const recipient = process.env.MY_WALLET;
  if (!recipient) throw new Error("MY_WALLET env variable not set");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);
  console.log("Recipient (DAO Wallet):", recipient);

  const MockWithdraw = await hre.ethers.getContractFactory("MockWithdraw");
  const mock = await MockWithdraw.deploy(recipient);
  await mock.waitForDeployment();

  const contractAddress = await mock.getAddress();
  console.log("Contract address:", contractAddress);

  fs.writeFileSync(
    ".last_deploy.json",
    JSON.stringify({ contract: contractAddress, recipient })
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
