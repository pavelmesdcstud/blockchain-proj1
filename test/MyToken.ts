import { expect } from "chai";
import { network } from "hardhat";

describe("MyToken", function () {
  it("Should deploy with correct initial supply", async function () {
    const { ethers } = await network.create();
    const [deployer] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(
      ethers.parseEther("1000000")
    );

    await myToken.waitForDeployment();

    expect(await myToken.balanceOf(deployer.address)).to.equal(
      ethers.parseEther("1000000")
    );
  });
});

