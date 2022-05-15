var OpenMembershipModule = artifacts.require("./OpenMembershipModule.sol");
var DaosFactory = artifacts.require("./DaosFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(OpenMembershipModule);

  const openMembership = await InviteMembershipModule.deployed();
  const daosFactory = await DaosFactory.deployed();

  daosFactory.addModule(openMembership.address
    , bytes8(keccak256(abi.encode("OpenMembershipModule")))
    , bytes8(keccak256(abi.encode("MemberModule"))));
};
