import { network } from "hardhat";

async function main(): Promise<void> {
  const { ethers } = await network.create();
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);

  const MyToken = await ethers.getContractFactory("MyToken");

  const mytoken = await MyToken.deploy(
    ethers.parseEther("1000000")
  );

  await mytoken.waitForDeployment();

  console.log("MyToken deployed to:", await mytoken.getAddress());
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

