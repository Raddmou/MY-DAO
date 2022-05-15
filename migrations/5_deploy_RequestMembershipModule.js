var RequestMembershipModule = artifacts.require("./RequestMembershipModule.sol");
var DaosFactory = artifacts.require("./DaosFactory.sol");

module.exports = async function(deployer) {
  await deployer.deploy(RequestMembershipModule);

  const requestMembership = await RequestMembershipModule.deployed();
  const daosFactory = await DaosFactory.deployed();
  const typeHashed = await daosFactory.hash("RequestMembershipModule");
  const codeHashed = await daosFactory.hash("MemberModule");

  daosFactory.addModule(requestMembership.address
    , typeHashed
    , codeHashed);
};
