var InviteMembershipModule = artifacts.require("./InviteMembershipModule.sol");
var DaosFactory = artifacts.require("./DaosFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(InviteMembershipModule);

  const inviteMembership = await InviteMembershipModule.deployed();
  const daosFactory = await DaosFactory.deployed();

  daosFactory.addModule(inviteMembership.address
    , bytes8(keccak256(abi.encode("InviteMembershipModule")))
    , bytes8(keccak256(abi.encode("MemberModule"))));
};
