var InviteMembershipModule = artifacts.require("./InviteMembershipModule.sol");
var DaosFactory = artifacts.require("./DaosFactory.sol");

module.exports = async function(deployer) {
  await deployer.deploy(InviteMembershipModule);

  const inviteMembership = await InviteMembershipModule.deployed();
  const daosFactory = await DaosFactory.deployed();
  const typeHashed = await daosFactory.hash("InviteMembershipModule");
  const codeHashed = await daosFactory.hash("MemberModule");

  daosFactory.addModule(inviteMembership.address
    , typeHashed
    , codeHashed);
};
