var VotingYesNoModule = artifacts.require("./VotingYesNoModule.sol");
var DaosFactory = artifacts.require("./DaosFactory.sol");

module.exports = async function(deployer) {
  await deployer.deploy(VotingYesNoModule);

  const inviteMembership = await VotingYesNoModule.deployed();
  const daosFactory = await DaosFactory.deployed();
  const typeHashed = await daosFactory.hash("VotingYesNoModule");
  const codeHashed = await daosFactory.hash("VotingModule");

  daosFactory.addModule(inviteMembership.address
    , typeHashed
    , codeHashed);
};
