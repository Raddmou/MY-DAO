var OpenMembershipModule = artifacts.require("./OpenMembershipModule.sol");

module.exports = function(deployer) {
  deployer.deploy(OpenMembershipModule);
};
