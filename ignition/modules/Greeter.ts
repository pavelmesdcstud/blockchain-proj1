import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GreeterModule = buildModule("GreeterModule", (m) => {
  const greeter = m.contract("Greeter", ["blockchain"]);

  return { greeter };
});

export default GreeterModule;

