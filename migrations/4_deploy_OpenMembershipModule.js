var OpenMembershipModule = artifacts.require("./OpenMembershipModule.sol");
var DaosFactory = artifacts.require("./DaosFactory.sol");

module.exports = async function(deployer) {
  await deployer.deploy(OpenMembershipModule);

  const openMembership = await OpenMembershipModule.deployed();
  const daosFactory = await DaosFactory.deployed();
  const typeHashed = await daosFactory.hash("OpenMembershipModule");
  const codeHashed = await daosFactory.hash("MemberModule");

  daosFactory.addModule(openMembership.address
    , typeHashed
    , codeHashed);
};
