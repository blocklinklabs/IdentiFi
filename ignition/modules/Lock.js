const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
// exporiting smart contract address
module.exports = buildModule("IdentiFi", (m) => {
  const identiFi = m.contract("IdentiFi");

  return { identiFi };
});
