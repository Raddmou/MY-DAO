var RequestMembershipModule = artifacts.require("./RequestMembershipModule.sol");

module.exports = function(deployer) {
  deployer.deploy(RequestMembershipModule);
};
