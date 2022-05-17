const { default: Web3 } = require('web3');

const DaosFactory = artifacts.require("./DaosFactory.sol");

require('chai')
  .use(require('chai-as-promised'))
  .should()

ADDR0 = "0x0000000000000000000000000000000000000000";

contract("DaosFactory", ([deployer, user1, user2]) => {
  var DaosFactoryInstance;
  const typeHashMember = "0x3ecd26b50115fb28";
  const typeHashVote = "0xac1652a4636fa1ef";
  const CodeHashOpen = "0x6bf7a9053457d398";
  const CodeHashInvite = "0x2bd4373f9dfab999";
  const CodeHashRequest = "0xea7de0043801a72e";
  const CodeHashVoteYesNo = "0xfde50a81ae34bf89";
  it("deploy instance", async () => {
    DaosFactoryInstance = await DaosFactory.deployed();
    // console.log(DaosFactoryInstance);
    // DaosFactoryInstance = await DaosFactory.deployed();
  });
  describe("CHECK DAO FACTORY", () => {
    it("Check Owner", async () => {
      var owner = await DaosFactoryInstance.owner();
      owner.should.equal(deployer);
    })
    it("Check Hash Type & Code", async () => {
      const typeHashMember2 = await DaosFactoryInstance.hash("MemberModule");
      const typeHashVote2 = await DaosFactoryInstance.hash("VotingModule");
      const CodeHashOpen2 = await DaosFactoryInstance.hash("OpenMembershipModule");
      const CodeHashInvite2 = await DaosFactoryInstance.hash("InviteMembershipModule");
      const CodeHashRequest2 = await DaosFactoryInstance.hash("RequestMembershipModule");
      const CodeHashVoteYesNo2 = await DaosFactoryInstance.hash("VotingYesNoModule");
      typeHashMember2.should.equal(typeHashMember);
      typeHashVote2.should.equal(typeHashVote);
      CodeHashOpen2.should.equal(CodeHashOpen);
      CodeHashInvite2.should.equal(CodeHashInvite);
      CodeHashRequest2.should.equal(CodeHashRequest);
      CodeHashVoteYesNo2.should.equal(CodeHashVoteYesNo);
    })
    describe("Check Module", () => {
      it("Check Module Open", async () => {
        const moduleOpen = await DaosFactoryInstance.modulesDaos(typeHashMember, CodeHashOpen);
        moduleOpen.isActive.should.equal(true);
        moduleOpen.moduleType.should.equal(typeHashMember);
        moduleOpen.moduleCode.should.equal(CodeHashOpen);
        moduleOpen.moduleInfo.should.equal("");
      })
      it("Check Module Invite", async () => {
        const moduleInvite = await DaosFactoryInstance.modulesDaos(typeHashMember, CodeHashInvite);
        moduleInvite.isActive.should.equal(true);
        moduleInvite.moduleType.should.equal(typeHashMember);
        moduleInvite.moduleCode.should.equal(CodeHashInvite);
        moduleInvite.moduleInfo.should.equal("");
      })
      it("Check Module Request", async () => {
        const moduleRequest = await DaosFactoryInstance.modulesDaos(typeHashMember, CodeHashRequest);
        moduleRequest.isActive.should.equal(true);
        moduleRequest.moduleType.should.equal(typeHashMember);
        moduleRequest.moduleCode.should.equal(CodeHashRequest);
        moduleRequest.moduleInfo.should.equal("");
      })
      it("Check Module VoteYesNo", async () => {
        const moduleVoteYesNo = await DaosFactoryInstance.modulesDaos(typeHashVote, CodeHashVoteYesNo);
        moduleVoteYesNo.isActive.should.equal(true);
        moduleVoteYesNo.moduleType.should.equal(typeHashVote);
        moduleVoteYesNo.moduleCode.should.equal(CodeHashVoteYesNo);
        moduleVoteYesNo.moduleInfo.should.equal("");
      })
    })
    describe("New Module", () => {
      const typeHashTest = "0x3b0a2c1d83cad235"
      const codeHashTest = "0x37e585bb7df6dc4f"
      describe("Success", () => {
        var newModule;
        it("Add New Module", async () => {
          newModule = await DaosFactoryInstance.addModule(deployer, typeHashTest, codeHashTest, {from :deployer});
        })
        it("Check Module Added", async () => {
          newModule = await DaosFactoryInstance.modulesDaos(typeHashTest, codeHashTest);
          newModule.moduleAddress.should.equal(deployer);
          newModule.isActive.should.equal(true);
          newModule.moduleType.should.equal(typeHashTest);
          newModule.moduleCode.should.equal(codeHashTest);
          newModule.moduleInfo.should.equal("");
        })
      })
      describe("Fail", () => {
        it("Fail Add Module Caller Not Owner", async () => {
          await DaosFactoryInstance.addModule(deployer, typeHashTest, codeHashTest, {from: user1})
            .should.be.rejectedWith("VM Exception while processing transaction: revert Ownable: caller is not the owne");
        })
      })
    })
  })
  describe("DAO", async () => {
    var daoOpen;
    const name = "TEST";
    const description = "TEST";
    const rules = "ole ola nene nana wagmi"
    describe("DAO OPEN", () => {
      describe("Init", () => {
        it("Create DAO Open", async () => {
          daoOpen = await DaosFactoryInstance.createDAO(name, description, 0, rules, [{moduleType:typeHashMember, moduleCode:CodeHashOpen}], {from: user1});
          daoOpen.receipt.status.should.equal(true);
          // console.log(daoOpen)
        })
        it("Check DAO Owner", async () => {
          var addrDao = daoOpen.logs[2].args.daoAddress;
          var owner = await DaosFactoryInstance.daoOwners(addrDao, user1);
          owner.should.equal(true);
        })
      })
      describe("Deployed DAOs", () => {
        var deployedDao;
        it("Get Deployed DAOs", async () => {
          deployedDao = await DaosFactoryInstance.getdeployedDaos();
        })
        it("Check Deployed DAOs", async () => {
          var addrDao = daoOpen.logs[2].args.daoAddress;
          deployedDao[deployedDao.length - 1].owner.should.equal(user1);
          deployedDao[deployedDao.length - 1].daoAddress.should.equal(addrDao);
        })
      })
      describe("New Module", () => {
        // var addrDao = daoOpen.logs[2].args.daoAddress;
        describe("Success", () => {
          it("Activate Module Vote", async () => {
            // console.log("AAAAA");
            var addrDao = daoOpen.logs[2].args.daoAddress;
            // console.log("AAAAA");
            let res = await DaosFactoryInstance
              .activateModuleForDao(addrDao, typeHashVote, CodeHashVoteYesNo, {from: user1})
            // console.log(res);
            // console.log("SSSS");
          })
        })
        describe("Fail", () => {
          it("Fail Activate New Module Caller Not Owner", async () => {
            var addrDao = daoOpen.logs[2].args.daoAddress;
            let res =await DaosFactoryInstance
              .activateModuleForDao(addrDao, typeHashVote, CodeHashVoteYesNo, {from: user2})
                .should.be.rejectedWith("M Exception while processing transaction: revert Invalid User")
            // console.log(res);
          })
        })
      })
      describe("Event", () => {
        it("check event OwnershipTransferred 1", async () => {
          const log = daoOpen.logs[0];
          // console.log(log);
          log.event.should.equal('OwnershipTransferred');
          const res = log.args;
          res.previousOwner.should.equal(ADDR0);
          res.newOwner.should.equal(DaosFactoryInstance.address);
        })
        it("check event OwnershipTransferred 2", async () => {
          const log = daoOpen.logs[1];
          log.event.should.equal('OwnershipTransferred');
          const res = log.args;
          res.previousOwner.should.equal(DaosFactoryInstance.address);
          res.newOwner.should.equal(user1);
        })
        it("check event DaoCreated", async () => {
          const log = daoOpen.logs[2];
          log.event.should.equal('DaoCreated');
          const res = log.args;
          res.user.should.equal(user1, "correct user");
          res.name.should.equal(name, "correct name");
        })
      })
    })
    describe("DAO INVITE", () => {
      describe("Init", () => {
        it("create DAO Invite", async () => {
          daoOpen = await DaosFactoryInstance.createDAO(name, description, 0, rules, [{moduleType:typeHashMember, moduleCode:CodeHashOpen}], {from: user2});
          daoOpen.receipt.status.should.equal(true);
        })
        it("Check Dao Owner", async () => {
          var addrDao = daoOpen.logs[2].args.daoAddress;
          var owner = await DaosFactoryInstance.daoOwners(addrDao, user2);
          owner.should.equal(true);
        })
      })
      describe("Deployed DAOs", () => {
        var deployedDao;
        it("Get Deployed DAOs", async () => {
          deployedDao = await DaosFactoryInstance.getdeployedDaos();
          // console.log(deployedDao)
        })
        it("Check Deployed DAOs", async () => {
          var addrDao = daoOpen.logs[2].args.daoAddress;
          deployedDao[deployedDao.length - 1].owner.should.equal(user2);
          deployedDao[deployedDao.length - 1].daoAddress.should.equal(addrDao);
        })
      })
      describe("Event", () => {
        it("check event OwnershipTransferred 1", async () => {
          const log = daoOpen.logs[0];
          // console.log(log);
          log.event.should.equal('OwnershipTransferred');
          const res = log.args;
          res.previousOwner.should.equal(ADDR0);
          res.newOwner.should.equal(DaosFactoryInstance.address);
        })
        it("check event OwnershipTransferred 2", async () => {
          const log = daoOpen.logs[1];
          log.event.should.equal('OwnershipTransferred');
          const res = log.args;
          res.previousOwner.should.equal(DaosFactoryInstance.address);
          res.newOwner.should.equal(user2);
        })
        it("check event DaoCreated", async () => {
          const log = daoOpen.logs[2];
          log.event.should.equal('DaoCreated');
          const res = log.args;
          res.user.should.equal(user2, "correct user");
          res.name.should.equal(name, "correct name");
        })
      })
    })
  })
})