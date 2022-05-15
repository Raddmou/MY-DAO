var InviteMembershipModule = artifacts.require("./InviteMembershipModule.sol");

module.exports = function(deployer) {
  deployer.deploy(InviteMembershipModule);
};
