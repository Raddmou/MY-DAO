const { default: Web3 } = require('web3');

const DaosFactory = artifacts.require("./DaosFactory.sol");

require('chai')
  .use(require('chai-as-promised'))
  .should()

ADDR0 = "0x0000000000000000000000000000000000000000";

contract("DaosFactory", ([deployer, user1]) => {
  var DaosFactoryInstance;
  it("deploy instance", async () => {
    DaosFactoryInstance = await DaosFactory.new();
    // DaosFactoryInstance = await DaosFactory.deployed();
  });
  it("check owner", async () => {
    var owner = await DaosFactoryInstance.owner();
    owner.should.equal(deployer);
  })
  describe("DAO", () => {
    var dao;
    const name = "TEST";
    const description = "TEST";
    it("create new DAO", async () => {
      dao = await DaosFactoryInstance.createDAO(name, true, description, false, {from: user1});
      dao.receipt.status.should.equal(true);
    })
    describe("Event", () => {
      it("check event 0", async () => {
        const log = dao.logs[0];
        log.event.should.equal('OwnershipTransferred');
        const res = log.args;
        res.previousOwner.should.equal(ADDR0);
        res.newOwner.should.equal(DaosFactoryInstance.address);
      })
      it("check event 1", async () => {
        const log = dao.logs[1];
        log.event.should.equal('OwnershipTransferred');
        const res = log.args;
        res.previousOwner.should.equal(DaosFactoryInstance.address);
        res.newOwner.should.equal(user1);
      })
      it("check event 2", async () => {
        const log = dao.logs[2];
        log.event.should.equal('DaoCreated');
        const res = log.args;
        res.user.should.equal(user1, "correct user");
        res.name.should.equal(name, "correct name");
      })
    })
    describe("getdeployedDaos", () => {
      it("get all daos", async () => {
        const daos = await DaosFactoryInstance.getdeployedDaos();
        daos.length.should.equal(1);
      })
    })
    describe("getDaosAddressByMember", () => {
      it("get address of the doa", async () => {
        const addrDao = await DaosFactoryInstance.getDaosAddressByMember(user1);
        // console.log(addrDao);
      })
    })
  })
});