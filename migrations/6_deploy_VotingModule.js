var VotingModule = artifacts.require("./VotingModule.sol");

module.exports = function(deployer) {
  deployer.deploy(VotingModule);
};
