
import { expect } from "chai";
import { network } from "hardhat";

describe("MyToken", function () {
  it("Should deploy with correct initial supply", async function () {
    const { ethers } = await network.create();
    const [deployer] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(ethers.parseEther("1000000"));

    await myToken.waitForDeployment();

    expect(await myToken.balanceOf(deployer.address)).to.equal(
      ethers.parseEther("1000000")
    );
  });

  it("Should allow owner to mint tokens", async function () {
    const { ethers } = await network.create();
    const [deployer, user] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(ethers.parseEther("1000000"));

    await myToken.waitForDeployment();

    await myToken.mint(user.address, ethers.parseEther("100"));

    expect(await myToken.balanceOf(user.address)).to.equal(
      ethers.parseEther("100")
    );
  });

  it("Should transfer tokens between accounts", async function () {
    const { ethers } = await network.create();
    const [deployer, user] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(ethers.parseEther("100"));

    await myToken.waitForDeployment();

    await myToken.transfer(user.address, ethers.parseEther("99"));

    expect(await myToken.balanceOf(user.address)).to.equal(
      ethers.parseEther("99")
    );

    expect(await myToken.balanceOf(deployer.address)).to.equal(
      ethers.parseEther("1")
    );
  });

  it("Should reject transfers exceeding balance", async function () {
    const { ethers } = await network.create();
    const [deployer, user] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(ethers.parseEther("100"));

    await myToken.waitForDeployment();

    let errorThrown = false;

    try {
      await myToken.connect(user).transfer(
        deployer.address,
        ethers.parseEther("101")
      );
    } catch (error) {
      errorThrown = true;
    }

    expect(errorThrown).to.equal(true);
  });

  it("Should reject minting from non-owner", async function () {
    const { ethers } = await network.create();
    const [deployer, user] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(ethers.parseEther("1000000"));

    await myToken.waitForDeployment();

    let errorThrown = false;

    try {
      await myToken.connect(user).mint(
        user.address,
        ethers.parseEther("100")
      );
    } catch (error) {
      errorThrown = true;
    }

    expect(errorThrown).to.equal(true);
  });
});

