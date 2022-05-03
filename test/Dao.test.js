const { default: Web3 } = require('web3');

const Dao = artifacts.require("./Dao.sol");

require('chai')
  .use(require('chai-as-promised'))
  .should()

ADDR0 = "0x0000000000000000000000000000000000000000";

contract("Dao", ([deployer, user1]) => {
  var daoInstance;
  const name = "test";
  const description = "test";
  describe("deploy & check", () => {
    it("deploy DAO instance", async () => {
      daoInstance = await Dao.new(name, false, description, false);
      // DaosFactoryInstance = await DaosFactory.deployed();
    });
    it("check instance owner", async () => {
      var owner = await daoInstance.owner();
      owner.should.equal(deployer);
    })
    it("check name", async () => {
      var _name = await daoInstance.name();
      _name.should.equal(name);
    })
    it("check description", async () => {
      var _description = await daoInstance.description();
      _description.should.equal(description);
    })
  })
  describe("Dao", () => {
    var joinDao;
    it("join the Dao", async () => {
      joinDao = await daoInstance.join({from: user1});
      joinDao.receipt.status.should.equal(true);
    })
    it("check event", async () => {
      const log = joinDao.logs[0];
      log.event.should.equal('MemberJoined');
      const res = log.args;
      res.memberJoined.should.equal(user1);
      // console.log(res);
    })
  })
});