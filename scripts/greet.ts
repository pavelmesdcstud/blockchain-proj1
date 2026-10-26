import { network } from "hardhat";
const { viem } = await network.create();

const greeter = await viem.getContractAt(
  "Greeter",
  "0xFA571Cdfe0A195716D1Db26446B3Dee62107154b"
);

console.log(await greeter.read.greet());
