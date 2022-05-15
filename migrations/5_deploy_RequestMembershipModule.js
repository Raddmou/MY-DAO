var RequestMembershipModule = artifacts.require("./RequestMembershipModule.sol");
var DaosFactory = artifacts.require("./DaosFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(RequestMembershipModule);

  const requestMembership = await InviteMembershipModule.deployed();
  const daosFactory = await DaosFactory.deployed();

  daosFactory.addModule(requestMembership.address
    , bytes8(keccak256(abi.encode("RequestMembershipModule")))
    , bytes8(keccak256(abi.encode("MemberModule"))));
};
