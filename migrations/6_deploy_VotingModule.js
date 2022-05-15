var VotingModule = artifacts.require("./VotingModule.sol");

module.exports = function(deployer) {
  deployer.deploy(VotingModule);

  const inviteMembership = await InviteMembershipModule.deployed();
  const daosFactory = await DaosFactory.deployed();

  daosFactory.addModule(inviteMembership.address
    , bytes8(keccak256(abi.encode("VotingYesNoModule")))
    , bytes8(keccak256(abi.encode("VotingModule"))));
};
