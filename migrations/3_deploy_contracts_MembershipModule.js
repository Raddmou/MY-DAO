var MembershipModule = artifacts.require("./MembershipModule.sol");

module.exports = function(deployer) {
  deployer.deploy(MembershipModule);
};
