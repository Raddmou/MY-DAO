var VotingYesNoModule = artifacts.require("./VotingYesNoModule.sol");
var DaosFactory = artifacts.require("./DaosFactory.sol");

module.exports = async function(deployer) {

  const daosFactory = await DaosFactory.deployed();
  await deployer.deploy(VotingYesNoModule, daosFactory.address);
  const inviteMembership = await VotingYesNoModule.deployed();
  const codeHashed = await daosFactory.hash("VotingYesNoModule");
  const typeHashed = await daosFactory.hash("VotingModule");

  daosFactory.addModule(inviteMembership.address
    , typeHashed
    , codeHashed);
};
