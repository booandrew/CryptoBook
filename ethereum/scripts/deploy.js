const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners(); //get the account to deploy the contract

  console.log("Deploying contracts with the account:", deployer.address);

  const ContactFactory = await ethers.getContractFactory("ContactFactory");
  const factory = await ContactFactory.deploy();

  await factory.deployed();

  console.log("Greeter deployed to:", factory.address);
}

// address 0xabdBb6bD301181F8594d50295bAb0826981eF223

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
