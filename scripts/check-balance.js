// scripts/check-balance.js
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const contractAddress = process.env.CONTRACT;
  const walletAddress = process.env.MY_WALLET;

  if (!walletAddress || !contractAddress) {
    throw new Error("لطفاً متغیرهای CONTRACT و MY_WALLET را export کنید.");
  }

  const provider = hre.ethers.provider;

  // گرفتن موجودی کیف پول
  const balance = await provider.getBalance(walletAddress);

  if (balance === null || balance === undefined) {
    throw new Error("موجودی کیف پول پیدا نشد. آدرس را بررسی کنید.");
  }

  const balanceInEth = hre.ethers.utils.formatEther(balance);

  const output = `
Wallet Address: ${walletAddress}
Wallet Balance: ${balanceInEth} ETH
Contract Address: ${contractAddress}
`;

  console.log(output);
  fs.writeFileSync("balance-output.txt", output, "utf8");
  console.log("Output saved to balance-output.txt");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error("Error:", error);
    process.exit(1);
  });
