import hre from "hardhat";
import { upgrades } from "@openzeppelin/hardhat-upgrades";

const connection = await hre.network.create();
const { ethers } = connection;
const upgradesApi = await upgrades(hre, connection);

const MyTokenV3 = await ethers.getContractFactory("MyTokenV3");
const proxyAddress = "0xD73ED600962b5570d8fAC5822892c777eEeFBcF8"

const token = await upgradesApi.upgradeProxy(
    proxyAddress,
    MyTokenV3,
    { kind: "uups" }
);

await token.deploymentTransaction()?.wait(20);

console.log("Proxy:", await token.getAddress());
console.log("Version:", await token.version());
console.log("Supply:", ethers.formatEther(await token.totalSupply()));
