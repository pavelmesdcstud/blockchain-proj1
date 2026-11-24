import hre from "hardhat";

const { ethers } = await hre.network.create();
const [signer] = await ethers.getSigners();
const proxyAddress = "0xD73ED600962b5570d8fAC5822892c777eEeFBcF8"

let token = await ethers.getContractAt(
    "MyToken",
    proxyAddress
);

const version = await token.version();
console.log("Version:", await token.version());
console.log("Owner:", await token.owner());
console.log("Supply before:", ethers.formatEther(await token.totalSupply()));

await (await token.mint(signer.address, ethers.parseEther("100"))).wait(3);

console.log("Supply after:", ethers.formatEther(await token.totalSupply()));
console.log("Balance:", ethers.formatEther(await token.balanceOf(signer.address)));

if (version == "V3 :(") {
    let v3token = await ethers.getContractAt("MyTokenV3", proxyAddress)
    console.log("v3 contract, testing burning on 200 MTK..")
    await (await v3token.burn(ethers.parseEther("200"))).wait(10)
    console.log("Supply after:", ethers.formatEther(await token.totalSupply()));
    console.log("Balance:", ethers.formatEther(await token.balanceOf(signer.address)));
}
