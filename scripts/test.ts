import hre from "hardhat";

const { ethers } = await hre.network.create();
const [signer] = await ethers.getSigners();

const token = await ethers.getContractAt(
    "MyToken",
    "0xD73ED600962b5570d8fAC5822892c777eEeFBcF8"
);

console.log("Version:", await token.version());
console.log("Owner:", await token.owner());
console.log("Supply before:", ethers.formatEther(await token.totalSupply()));

await (await token.mint(signer.address, ethers.parseEther("100"))).wait(3);

console.log("Supply after:", ethers.formatEther(await token.totalSupply()));
console.log("Balance:", ethers.formatEther(await token.balanceOf(signer.address)));
