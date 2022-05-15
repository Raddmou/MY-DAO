var OpenMembershipModule = artifacts.require("./OpenMembershipModule.sol");
var DaosFactory = artifacts.require("./DaosFactory.sol");

module.exports = async function(deployer) {
  const daosFactory = await DaosFactory.deployed();
  await deployer.deploy(OpenMembershipModule, daosFactory.address);
  const openMembership = await OpenMembershipModule.deployed();
  const typeHashed = await daosFactory.hash("MemberModule");
  const codeHashed = await daosFactory.hash("OpenMembershipModule");

  daosFactory.addModule(openMembership.address
    , typeHashed
    , codeHashed);
};
