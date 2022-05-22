var SimpleDonatationsModule = artifacts.require("./SimpleDonationsModule.sol");
var DaosFactory = artifacts.require("./DaosFactory.sol");

module.exports = async function(deployer) {

  const daosFactory = await DaosFactory.deployed();
  await deployer.deploy(SimpleDonatationsModule, daosFactory.address);
  const inviteMembership = await SimpleDonatationsModule.deployed();
  const codeHashed = await daosFactory.hash("SimpleDonationsModule");
  const typeHashed = await daosFactory.hash("FundsModule");

  daosFactory.addModule(
    inviteMembership.address,
    typeHashed,
    codeHashed,
    false
  );
};
