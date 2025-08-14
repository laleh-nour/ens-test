const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // آدرس قرارداد (mock یا دیپلوی محلی خودت)
  const CONTRACT_ADDRESS = process.env.CONTRACT || "0x..."; // جایگزین کن یا export کن

  const [attacker] = await ethers.getSigners();
  const abi = JSON.parse(fs.readFileSync("abi/ETHRegistrarController.json", "utf8"));
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, attacker);

  console.log("Attacker:", attacker.address);
  // send some ETH to contract so withdraw can transfer
  const sendTx = await attacker.sendTransaction({ to: CONTRACT_ADDRESS, value: ethers.utils.parseEther("1") });
  await sendTx.wait();

  const rounds = 10;
  for (let i = 0; i < rounds; i++) {
    const before = Date.now();
    const tx = await contract.withdraw({ gasLimit: 5_000_000 });
    const receipt = await tx.wait();
    const after = Date.now();
    console.log(`Round ${i+1}: txHash=${tx.hash} gasUsed=${receipt.gasUsed.toString()} timeMs=${after-before}`);
    // optionally send a small amount again to refill
    await attacker.sendTransaction({ to: CONTRACT_ADDRESS, value: ethers.utils.parseEther("0.1") });
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
