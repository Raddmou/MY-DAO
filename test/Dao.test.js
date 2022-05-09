const { default: Web3 } = require('web3');

const Dao = artifacts.require("./Dao.sol");

require('chai')
  .use(require('chai-as-promised'))
  .should()

ADDR0 = "0x0000000000000000000000000000000000000000";

contract("Dao", ([deployer, user1, user2]) => {
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
    describe("Success", () => {
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
    describe("Fail", () => {
      var inviteInstance;
      var joinDao;
      it("fail to join when not public", async () => {
        inviteInstance = await Dao.new(name, true, description, false);
        joinDao = await inviteInstance.join({from: user1})
          .should.be.rejectedWith('VM Exception while processing transaction: revert Impossible to join');
      })
    })
  })
  describe("Invite Dao", () => {
    var inviteInstance;
    var joinDao;
    describe("Success", () => {
      var invite;
      it("Deploy InviteDao Instance", async () => {
        inviteInstance = await Dao.new(name, true, description, false, {from: deployer});
        await inviteInstance.authorizeContract(deployer, {from: deployer});
      })
      it("Invite Member to the Dao", async () => {
        invite = await inviteInstance.inviteMember(user1, {from: deployer});
        invite.receipt.status.should.equal(true);
        // console.log(invite);
      })
      it("check Event", async () => {
        const log = invite.logs[0];
        log.event.should.equal('MemberInvited');
        const res = log.args;
        res.memberInvitor.should.equal(deployer);
        res.memberInvited.should.equal(user1);
        // console.log(res);
      })
      it("Join Invite Dao", async () => {
        joinDao = await inviteInstance.join({from: user1});
        joinDao.receipt.status.should.equal(true);
      })
      it("Check Event", async () => {
        const log = joinDao.logs[0];
        log.event.should.equal('MemberJoined');
        const res = log.args;
        res.memberJoined.should.equal(user1);
      })
    })
    describe("Fail", async () => {
      it("Deploy InviteDao Instance", async () => {
        inviteInstance = await Dao.new(name, true, description, false, {from: deployer});
        // await inviteInstance.authorizeContract(deployer, {from: deployer});
      })
      it("Fail when Invitor not approved", async () => {
        await inviteInstance.inviteMember(user1, {from: user2})
          .should.be.rejectedWith('VM Exception while processing transaction: revert Not authorized');
      })
      it("fail to join when not invited", async () => {
        await inviteInstance.join({from: user1})
        .should.be.rejectedWith('VM Exception while processing transaction: revert Impossible to join');
      })
    })
  })
});