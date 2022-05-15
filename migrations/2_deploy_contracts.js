var DaosFactory = artifacts.require("./DaosFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(DaosFactory);
};
