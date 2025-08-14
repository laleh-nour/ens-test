// node scripts/check.js
const fs = require("fs");
const { ethers } = require("ethers");

async function main() {
  const info = JSON.parse(fs.readFileSync(".last_deploy.json", "utf8"));
  console.log(info);
}
main();
