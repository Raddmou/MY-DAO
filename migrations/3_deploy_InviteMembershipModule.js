var InviteMembershipModule = artifacts.require("./InviteMembershipModule.sol");
var DaosFactory = artifacts.require("./DaosFactory.sol");

module.exports = async function(deployer) {

  const daosFactory = await DaosFactory.deployed();
  await deployer.deploy(InviteMembershipModule, daosFactory.address);
  const inviteMembership = await InviteMembershipModule.deployed();
  const typeHashed = await daosFactory.hash("MemberModule");
  const codeHashed = await daosFactory.hash("InviteMembershipModule");

  daosFactory.addModule(inviteMembership.address
    , typeHashed
    , codeHashed);
};
