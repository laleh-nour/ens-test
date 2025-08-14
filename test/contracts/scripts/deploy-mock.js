async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with:", deployer.address);
  
    // choose a recipient (simulate DAO wallet)
    const recipient = (await ethers.getSigners())[9].address;
  
    const Mock = await ethers.getContractFactory("MockWithdraw");
    const mock = await Mock.deploy(recipient);
    await mock.deployed();
  
    console.log("MockWithdraw at:", mock.address);
    console.log("recipient:", recipient);
  }
  main().catch(console.error);
  