const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const deployInfo = JSON.parse(fs.readFileSync(".last_deploy.json"));
  const contractAddr = deployInfo.contract;
  const recipient = deployInfo.recipient;

  const contract = await hre.ethers.getContractAt("MockWithdraw", contractAddr);
  const [attacker] = await hre.ethers.getSigners();

  const provider = hre.ethers.provider;

  // موجودی قبل از حمله
  let balanceBefore = await provider.getBalance(recipient);
  console.log("Recipient balance before attack:", hre.ethers.formatEther(balanceBefore), "ETH");

  // واریز 1 ETH به قرارداد
  await attacker.sendTransaction({
    to: contractAddr,
    value: hre.ethers.parseEther("1.0"),
  });

  // اجرای withdraw
  const tx = await contract.connect(attacker).withdraw();
  console.log("TX hash:", tx.hash);
  await tx.wait();

  // موجودی بعد از حمله
  let balanceAfter = await provider.getBalance(recipient);
  console.log("Recipient balance after attack:", hre.ethers.formatEther(balanceAfter), "ETH");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
