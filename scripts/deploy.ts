import { network } from "hardhat";
import hre from "hardhat"
import { upgrades } from "@openzeppelin/hardhat-upgrades";


async function main(): Promise<void> {
  const connection = await network.create()
  const { ethers } = connection;
  const [deployer] = await ethers.getSigners();
  const upgradesApi = await upgrades(hre, connection)

  console.log("Deploying contract with account:", deployer.address);

  const MyToken = await ethers.getContractFactory("MyToken");

  const mytoken = await upgradesApi.deployProxy(MyToken, [ethers.parseEther("100000")], {kind: "uups"})

  await mytoken.waitForDeployment();
  var address = await mytoken.getAddress()

  console.log("MyToken proxy deployed to:", address);
  console.log(
        "Implementation deployed to:",
        await upgradesApi.erc1967.getImplementationAddress(address)
    );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

