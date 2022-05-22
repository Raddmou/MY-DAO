var RequestMembershipModule = artifacts.require("./RequestMembershipModule.sol");
var DaosFactory = artifacts.require("./DaosFactory.sol");

module.exports = async function(deployer) {

  const daosFactory = await DaosFactory.deployed();
  await deployer.deploy(RequestMembershipModule, daosFactory.address);
  const requestMembership = await RequestMembershipModule.deployed();
  const typeHashed = await daosFactory.hash("MemberModule");
  const codeHashed = await daosFactory.hash("RequestMembershipModule");

  daosFactory.addModule(requestMembership.address
    , typeHashed
    , codeHashed
    , true);
};
