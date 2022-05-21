// const { default: Web3 } = require('web3');
// const { ethers } = require('ethers');

const { web3 } = require('@openzeppelin/test-helpers/src/setup');

const DaosFactory = artifacts.require("./DaosFactory.sol");
const InviteMembershipModule = artifacts.require("./InviteMembershipModule.sol");
const OpenMembershipModule = artifacts.require("./OpenMembershipModule.sol");
const RequestMembershipModule = artifacts.require("./RequestMembershipModule.sol");
const VotingYesNoModule = artifacts.require("./VotingYesNoModule.sol");

require('chai')
  .use(require('chai-as-promised'))
  .should()

ADDR0 = "0x0000000000000000000000000000000000000000";

contract("DaosFactory", ([deployer, user1, user2, user3, user4]) => {
  var DaosFactoryInstance;
  const typeHashMember = "0x3ecd26b50115fb28";
  const typeHashVote = "0xac1652a4636fa1ef";
  const CodeHashOpen = "0x6bf7a9053457d398";
  const CodeHashInvite = "0x2bd4373f9dfab999";
  const CodeHashRequest = "0xea7de0043801a72e";
  const CodeHashVoteYesNo = "0xfde50a81ae34bf89";
  it("Recover Instance", async () => {
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
    const name = "TEST";
    const description = "TEST";
    const rules = "ole ola nene nana wagmi";

    describe("DAO OPEN", () => {
      var daoOpen;
      var addrDao;
      describe("Init", () => {
        it("Create DAO Open", async () => {
          daoOpen = await DaosFactoryInstance.createDAO(name, description, 0, rules, [{moduleType:typeHashMember, moduleCode:CodeHashOpen}], {from: user1});
          daoOpen.receipt.status.should.equal(true);
          // console.log(daoOpen)
        })
        it("Check DAO Owner", async () => {
          addrDao = daoOpen.logs[2].args.daoAddress;
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
          deployedDao[deployedDao.length - 1].owner.should.equal(user1);
          deployedDao[deployedDao.length - 1].daoAddress.should.equal(addrDao);
        })
      })
      describe("New Module", () => {
        describe("Success", () => {
          it("Activate Module Vote", async () => {
            let res = await DaosFactoryInstance
              .activateModuleForDao(addrDao, typeHashVote, CodeHashVoteYesNo, {from: user1})
          })
        })
        describe("Fail", () => {
          it("Fail Activate New Module Caller Not Owner", async () => {
            let res =await DaosFactoryInstance
              .activateModuleForDao(addrDao, typeHashVote, CodeHashVoteYesNo, {from: user2})
                .should.be.rejectedWith("M Exception while processing transaction: revert Invalid User")
          })
        })
      })
      describe("Event", () => {
        it("check event OwnershipTransferred 1", async () => {
          const log = daoOpen.logs[0];
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
      describe("OpenMembershipModule", () => {
        var OpenMembershipModuleInstance;
        var addrOpenMembership;
        it("Recover Open Membership Module", async () => {
          OpenMembershipModuleInstance = await OpenMembershipModule.deployed();
          addrOpenMembership = OpenMembershipModuleInstance.address
          // console.log(OpenMembershipModuleInstance)
        })
        it("Add Authorized Address", async () => {
          const AuthorizedAddress = await OpenMembershipModuleInstance
            .authorizeAddress(addrDao, addrOpenMembership, {from: user1})
          AuthorizedAddress.receipt.status.should.equal(true);
        })
        it("Check Authorized Address", async () => {
          const AuthorizedAddress = await OpenMembershipModuleInstance
            .authorizedAddress(addrDao, addrOpenMembership);
          AuthorizedAddress.should.equal(true);
        })
        it("Deny Authorized Address", async () => {
          const denyAddress = await OpenMembershipModuleInstance
            .denyAddress(addrDao, addrOpenMembership, {from: user1});
          denyAddress.receipt.status.should.equal(true);
        })
        it("Fail to Authorized Address when not Authorized", async () => {
          await OpenMembershipModuleInstance
            .authorizeAddress(addrDao, addrOpenMembership, {from: user2})
            .should.be.rejectedWith("VM Exception while processing transaction: revert Not authorized");
        })
        describe("Check Membership", () => {
          it("Check Members Count", async () => {
            const memberCount = await OpenMembershipModuleInstance.getMembersCount(addrDao);
            memberCount.toString().should.equal('1');
          })
          it("Check Address By Id", async () => {
            const addrById = await OpenMembershipModuleInstance.getAddrById(addrDao, 0);
            addrById.should.equal(user1);
          })
          it("Check Member Info", async () => {
            const memberInfo = await OpenMembershipModuleInstance.getMemberInfo(addrDao, user1);
            memberInfo.status.should.equal('3');
            // console.log("                  Join Time = " + memberInfo.joinTime);
            // memberInfo.joinTime.should.be.a('number')
          })
          it("Check isActive Member Success", async () => {
            const isActive = await OpenMembershipModuleInstance.isActiveMember(addrDao, user1);
            isActive.should.equal(true);
          })
          it("Check isActive Member Fail", async () => {
            const isActive = await OpenMembershipModuleInstance.isActiveMember(addrDao, user2);
            isActive.should.equal(false);
          })
        })
        describe("Join The Open DAO", () => {
          var join;
          it("User2 Join The Open DAO", async () => {
            join = await OpenMembershipModuleInstance.join(addrDao, {from: user2});
            join.receipt.status.should.equal(true);
          })
          it("Check User2 isActive", async () => {
            const isActive = await OpenMembershipModuleInstance.isActiveMember(addrDao, user2);
            isActive.should.equal(true);
          })
          it("Check Members Count Updated", async () => {
            const memberCount = await OpenMembershipModuleInstance.getMembersCount(addrDao);
            memberCount.toString().should.equal('2');
          })
          it("Check Event", async () => {
            const log = join.logs[0];
            log.event.should.equal('MemberJoined');
            const res = log.args;
            res.memberJoined.should.equal(user2);
          })
          it("Fail When User2 join again", async () => {
            await OpenMembershipModuleInstance.join(addrDao, {from: user2})
              .should.be.rejectedWith("VM Exception while processing transaction: revert Not authorized");
          })
        })
      })
    })

    describe("DAO INVITE", () => {
      var daoInvite;
      var addrDao;
      describe("Init", () => {
        it("create DAO Invite", async () => {
          daoInvite = await DaosFactoryInstance.createDAO(
            name,
            description,
            0,
            rules,
            [{moduleType:typeHashMember, moduleCode:CodeHashInvite}],
            {from: user1}
          );
          daoInvite.receipt.status.should.equal(true);
        })
        it("Check Dao Owner", async () => {
          addrDao = daoInvite.logs[2].args.daoAddress;
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
          deployedDao.length.should.equal(2);
          deployedDao[deployedDao.length - 1].owner.should.equal(user1);
          deployedDao[deployedDao.length - 1].daoAddress.should.equal(addrDao);
        })
      })
      describe("Event", () => {
        it("check event OwnershipTransferred 1", async () => {
          const log = daoInvite.logs[0];
          log.event.should.equal('OwnershipTransferred');
          const res = log.args;
          res.previousOwner.should.equal(ADDR0);
          res.newOwner.should.equal(DaosFactoryInstance.address);
        })
        it("check event OwnershipTransferred 2", async () => {
          const log = daoInvite.logs[1];
          log.event.should.equal('OwnershipTransferred');
          const res = log.args;
          res.previousOwner.should.equal(DaosFactoryInstance.address);
          res.newOwner.should.equal(user1);
        })
        it("check event DaoCreated", async () => {
          const log = daoInvite.logs[2];
          log.event.should.equal('DaoCreated');
          const res = log.args;
          res.user.should.equal(user1, "correct user");
          res.name.should.equal(name, "correct name");
        })
      })
      describe("InviteMembershipModule", () => {
        var inviteMembershipModuleInstance;
        var addrInviteMembership;
        it("Recover Invite Membership Module", async () => {
          inviteMembershipModuleInstance = await InviteMembershipModule.deployed();
          addrInviteMembership = inviteMembershipModuleInstance.address
        })
        it("Add Authorized Address", async () => {
          const AuthorizedAddress = await inviteMembershipModuleInstance
            .authorizeAddress(addrDao, user3, {from: user1})
          AuthorizedAddress.receipt.status.should.equal(true);
        })
        it("Check Authorized Address", async () => {
          const AuthorizedAddress = await inviteMembershipModuleInstance
            .authorizedAddress(addrDao, user1);
          AuthorizedAddress.should.equal(true);
        })
        it("Deny Authorized Address", async () => {
          const denyAddress = await inviteMembershipModuleInstance
            .denyAddress(addrDao, addrInviteMembership, {from: user1});
          denyAddress.receipt.status.should.equal(true);
        })
        it("Fail to Authorized Address when not Authorized", async () => {
          await inviteMembershipModuleInstance
            .authorizeAddress(addrDao, addrInviteMembership, {from: user2})
            .should.be.rejectedWith("VM Exception while processing transaction: revert Not authorized");
        })
        describe("Check Membership", () => {
          it("Check Members Count", async () => {
            const memberCount = await inviteMembershipModuleInstance.getMembersCount(addrDao);
            memberCount.toString().should.equal('1');
          })
          it("Check Address By Id", async () => {
            const addrById = await inviteMembershipModuleInstance.getAddrById(addrDao, 0);
            addrById.should.equal(user1);
          })
          it("Check Member Info", async () => {
            const memberInfo = await inviteMembershipModuleInstance.getMemberInfo(addrDao, user1);
            memberInfo.status.should.equal('3');
            // console.log("                  Join Time = " + memberInfo.joinTime);
            // memberInfo.joinTime.should.be.a('number')
          })
          it("Check isActive Member Success", async () => {
            const isActive = await inviteMembershipModuleInstance.isActiveMember(addrDao, user1);
            isActive.should.equal(true);
          })
          it("Check isActive Member Fail", async () => {
            const isActive = await inviteMembershipModuleInstance.isActiveMember(addrDao, user2);
            isActive.should.equal(false);
          })
        })
        describe("Join The Invite Dao", () => {
          describe("Invite User2", () => {
            var success;
            it("Fail to join when not Invited", async () => {
              await inviteMembershipModuleInstance.join(addrDao, {from: user2})
               .should.be.rejectedWith("VM Exception while processing transaction: revert Impossible to join");
            })
            it("Successfuly Invite User2", async () => {
              success = await inviteMembershipModuleInstance.inviteMember(addrDao, user2, {from: user1});
              success.receipt.status.should.equal(true);
            })
            it("Failed to invite user2 again", async () => {
              await inviteMembershipModuleInstance.inviteMember(addrDao, user2, {from: user1})
                .should.be.rejectedWith("VM Exception while processing transaction: revert Invalid Member: must be not a member");
            })
            it("Check if info is correct", async () => {
              const info = await inviteMembershipModuleInstance.getMemberInfo(addrDao, user2);
              info.status.toString().should.equal("1");
            })
            it("Check Event", async () => {
              const log = success.logs[0];
              log.event.should.equal("MemberInvited");
              const res = log.args;
              res.memberInvited.should.equal(user2);
              res.memberInvitor.should.equal(user1);
            })
            var join;
            it("User2 Join the Invite DAO", async () => {
              join = await inviteMembershipModuleInstance.join(addrDao, {from: user2});
              join.receipt.status.should.equal(true);
            })
            it("Check Event Join", async () => {
              const log = join.logs[0];
              log.event.should.equal("MemberJoined");
              const res = log.args;
              res.memberJoined.should.equal(user2);
            })
            it("Check User2 isActive", async () => {
              const memberInfo = await inviteMembershipModuleInstance.getMemberInfo(addrDao, user2);
              const isActive = await inviteMembershipModuleInstance.isActiveMember(addrDao, user2);
              isActive.should.equal(true);
            })
            it("Check Members Count Updated", async () => {
              const memberCount = await inviteMembershipModuleInstance.getMembersCount(addrDao);
              memberCount.toString().should.equal('2');
            })
            it("Fail When User2 join again", async () => {
              await inviteMembershipModuleInstance.join(addrDao, {from: user2})
                .should.be.rejectedWith("VM Exception while processing transaction: revert Not authorized");
            })
          })
          describe("Invite User3 by newMember", () => {
            var success;
            it("Successfuly Invite User3 by User2", async () => {
              success = await inviteMembershipModuleInstance.inviteMember(addrDao, user3, {from: user2});
              success.receipt.status.should.equal(true);
            })
            it("Check Event", async () => {
              const log = success.logs[0];
              log.event.should.equal("MemberInvited");
              const res = log.args;
              res.memberInvited.should.equal(user3);
              res.memberInvitor.should.equal(user2);
            })
            it("Check if info is correct", async () => {
              const info = await inviteMembershipModuleInstance.getMemberInfo(addrDao, user3);
              info.status.toString().should.equal("1");
            })
            var join;
            it("User3 Join Invite DAO", async () => {
              join = await inviteMembershipModuleInstance.join(addrDao, {from: user3});
              join.receipt.status.should.equal(true);
            })
            it("Check Event Join", async () => {
              const log = join.logs[0];
              log.event.should.equal("MemberJoined");
              const res = log.args;
              res.memberJoined.should.equal(user3);
            })
            it("Check User3 isActive", async () => {
              const isActive = await inviteMembershipModuleInstance.isActiveMember(addrDao, user3);
              isActive.should.equal(true);
            })
            it("Check Members Count Updated", async () => {
              const memberCount = await inviteMembershipModuleInstance.getMembersCount(addrDao);
              memberCount.toString().should.equal('3');
            })
            it("Fail When User3 join again", async () => {
              await inviteMembershipModuleInstance.join(addrDao, {from: user3})
                .should.be.rejectedWith("VM Exception while processing transaction: revert Not authorized");
            })
          })
          describe("Check addMember function", () => {
            var addMember;
            it("Add user4 with addMember", async () => {
              addMember = await inviteMembershipModuleInstance.addMember(addrDao, user4, {from: user3});
              addMember.receipt.status.should.equal(true);
            })
            it("Check Event", async () => {
              const log = addMember.logs[0];
              log.event.should.equal("MemberAdded");
              const res = log.args;
              res.newMember.should.equal(user4);
              res.adderAddress.should.equal(user3);
            })
            it("Failed to add active member", async () => {
              await inviteMembershipModuleInstance.addMember(addrDao, user4, {from: user3})
                .should.be.rejectedWith("VM Exception while processing transaction: revert Invalid Member: must be not a member");
            })
          })
        })
      })
    })

    describe("DAO REQUEST", () => {
      var daoRequest;
      var addrDao;
      describe("Init", () => {
        it("create DAO Invite", async () => {
          daoRequest = await DaosFactoryInstance.createDAO(
            name,
            description,
            0,
            rules,
            [{moduleType:typeHashMember, moduleCode:CodeHashRequest}],
            {from: user1}
          );
          daoRequest.receipt.status.should.equal(true);
        })
        it("Check Dao Owner", async () => {
          addrDao = daoRequest.logs[2].args.daoAddress;
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
          deployedDao.length.should.equal(3);
          deployedDao[deployedDao.length - 1].owner.should.equal(user1);
          deployedDao[deployedDao.length - 1].daoAddress.should.equal(addrDao);
        })
      })
      describe("Event", () => {
        it("check event OwnershipTransferred 1", async () => {
          const log = daoRequest.logs[0];
          log.event.should.equal('OwnershipTransferred');
          const res = log.args;
          res.previousOwner.should.equal(ADDR0);
          res.newOwner.should.equal(DaosFactoryInstance.address);
        })
        it("check event OwnershipTransferred 2", async () => {
          const log = daoRequest.logs[1];
          log.event.should.equal('OwnershipTransferred');
          const res = log.args;
          res.previousOwner.should.equal(DaosFactoryInstance.address);
          res.newOwner.should.equal(user1);
        })
        it("check event DaoCreated", async () => {
          const log = daoRequest.logs[2];
          log.event.should.equal('DaoCreated');
          const res = log.args;
          res.user.should.equal(user1, "correct user");
          res.name.should.equal(name, "correct name");
        })
      })
      describe("RequestMembershipModule", () => {
        var requestMembershipModuleInstance;
        var addrRequestMembership;
        it("Recover Invite Membership Module", async () => {
          requestMembershipModuleInstance = await RequestMembershipModule.deployed();
          addrRequestMembership = requestMembershipModuleInstance.address
        })
        it("Add Authorized Address", async () => {
          const AuthorizedAddress = await requestMembershipModuleInstance
            .authorizeAddress(addrDao, user3, {from: user1})
          AuthorizedAddress.receipt.status.should.equal(true);
        })
        it("Check Authorized Address", async () => {
          const AuthorizedAddress = await requestMembershipModuleInstance
            .authorizedAddress(addrDao, user1);
          AuthorizedAddress.should.equal(true);
        })
        it("Deny Authorized Address", async () => {
          const denyAddress = await requestMembershipModuleInstance
            .denyAddress(addrDao, user3, {from: user1});
          denyAddress.receipt.status.should.equal(true);
        })
        it("Fail to Authorized Address when not Authorized", async () => {
          await requestMembershipModuleInstance
            .authorizeAddress(addrDao, addrRequestMembership, {from: user2})
            .should.be.rejectedWith("VM Exception while processing transaction: revert Not authorized");
        })
        describe("Check Membership", () => {
          it("Check Members Count", async () => {
            const memberCount = await requestMembershipModuleInstance.getMembersCount(addrDao);
            memberCount.toString().should.equal('1');
          })
          it("Check Address By Id", async () => {
            const addrById = await requestMembershipModuleInstance.getAddrById(addrDao, 0);
            addrById.should.equal(user1);
          })
          it("Check Member Info", async () => {
            const memberInfo = await requestMembershipModuleInstance.getMemberInfo(addrDao, user1);
            memberInfo.status.should.equal('3');
          })
          it("Check isActive Member Success", async () => {
            const isActive = await requestMembershipModuleInstance.isActiveMember(addrDao, user1);
            isActive.should.equal(true);
          })
          it("Check isActive Member notMember", async () => {
            const isActive = await requestMembershipModuleInstance.isActiveMember(addrDao, user2);
            isActive.should.equal(false);
          })
        })
        describe("Join the Request DAO", () => {
          describe("User2 request Owner accept", () => {
            var success;
            it("Fail to join when not Approved", async () => {
              await requestMembershipModuleInstance.addMember(addrDao, user2, {from: user2})
               .should.be.rejectedWith("VM Exception while processing transaction: revert Not authorized");
            })
            it("Request to Join the DAO", async () => {
              success = await requestMembershipModuleInstance.requestJoin(addrDao, {from: user2});
              success.receipt.status.should.equal(true);
            })
            it("Check Event", async () => {
              const log = success.logs[0];
              log.event.should.equal('MemberAskedJoin');
              const res = log.args;
              res.memberRequestor.should.equal(user2);
            })
            it("Check if info is correct", async () => {
              const info = await requestMembershipModuleInstance.getMemberInfo(addrDao, user2);
              info.status.toString().should.equal("2");
            })
            it("Fail to request again", async () => {
              await requestMembershipModuleInstance.requestJoin(addrDao, {from: user2})
                .should.be.rejectedWith("VM Exception while processing transaction: revert Invalid Member: must be not a member");
            })
            var acceptMember;
            it("User2 Accepted by the Owner", async () => {
              acceptMember = await requestMembershipModuleInstance.acceptMember(addrDao, user2, {from: user1});
              acceptMember.receipt.status.should.equal(true);
            })
            it("Check Event acceptMember", async () => {
              const log = acceptMember.logs[0];
              log.event.should.equal("MemberAccepted");
              const res = log.args;
              res.newMember.should.equal(user2);
              res.acceptorAddress.should.equal(user1);
            })
            it("Check status isActive", async () => {
              const isActive = await requestMembershipModuleInstance.isActiveMember(addrDao, user2);
              isActive.should.equal(true);
            })
            it("Check Members Count Updated", async () => {
              const memberCount = await requestMembershipModuleInstance.getMembersCount(addrDao);
              memberCount.toString().should.equal('2');
            })
            it("Fail When User2 accepted again", async () => {
              await requestMembershipModuleInstance.acceptMember(addrDao, user2, {from: user1})
                .should.be.rejectedWith("VM Exception while processing transaction: revert Invalid Member: must be asking");
            })
          })
          describe("User3 request Member accept", () => {
            var success;
            it("Fail to join when not Approved", async () => {
              await requestMembershipModuleInstance.addMember(addrDao, user3, {from: user3})
               .should.be.rejectedWith("VM Exception while processing transaction: revert Not authorized");
            })
            it("Request to Join the DAO", async () => {
              success = await requestMembershipModuleInstance.requestJoin(addrDao, {from: user3});
              success.receipt.status.should.equal(true);
            })
            it("Check Event", async () => {
              const log = success.logs[0];
              log.event.should.equal('MemberAskedJoin');
              const res = log.args;
              res.memberRequestor.should.equal(user3);
            })
            it("Check if info is correct", async () => {
              const info = await requestMembershipModuleInstance.getMemberInfo(addrDao, user3);
              info.status.toString().should.equal("2");
            })
            it("Fail to request again", async () => {
              await requestMembershipModuleInstance.requestJoin(addrDao, {from: user3})
                .should.be.rejectedWith("VM Exception while processing transaction: revert Invalid Member: must be not a member");
            })
            var acceptMember;
            it("User2 Accepted by a Member", async () => {
              acceptMember = await requestMembershipModuleInstance.acceptMember(addrDao, user3, {from: user2});
              acceptMember.receipt.status.should.equal(true);
            })
            it("Check Event acceptMember", async () => {
              const log = acceptMember.logs[0];
              log.event.should.equal("MemberAccepted");
              const res = log.args;
              res.newMember.should.equal(user3);
              res.acceptorAddress.should.equal(user2);
            })
            it("Check status isActive", async () => {
              const isActive = await requestMembershipModuleInstance.isActiveMember(addrDao, user3);
              isActive.should.equal(true);
            })
            it("Check Members Count Updated", async () => {
              const memberCount = await requestMembershipModuleInstance.getMembersCount(addrDao);
              memberCount.toString().should.equal('3');
            })
            it("Fail When User3 accepted again", async () => {
              await requestMembershipModuleInstance.acceptMember(addrDao, user3, {from: user2})
                .should.be.rejectedWith("VM Exception while processing transaction: revert Invalid Member: must be asking");
            })
          })
          describe("Check addMember function", () => {
            var addMember;
            it("Add user4 with addMember", async () => {
              addMember = await requestMembershipModuleInstance.addMember(addrDao, user4, {from: user2});
              addMember.receipt.status.should.equal(true);
            })
            it("Check Event", async () => {
              const log = addMember.logs[0];
              log.event.should.equal("MemberAdded");
              const res = log.args;
              res.newMember.should.equal(user4);
              res.adderAddress.should.equal(user2);
            })
            it("Check Members Count Updated", async () => {
              const memberCount = await requestMembershipModuleInstance.getMembersCount(addrDao);
              memberCount.toString().should.equal('4');
            })
            it("Failed to add active member", async () => {
              await requestMembershipModuleInstance.addMember(addrDao, user4, {from: user2})
                .should.be.rejectedWith("VM Exception while processing transaction: revert Invalid Member: must be not a member");
            })
          })
        })
      })
    })

    describe("DAO MEMBERSHIP(OPEN) + VOTING YES NO", () => {
      var daoOpenVoteYesNo;
      var addrDao;
      describe("Init", () => {
        it("create DAO Open + Vote Yes No", async () => {
          daoOpenVoteYesNo = await DaosFactoryInstance.createDAO(
            name,
            description,
            0,
            rules,
            [
              {moduleType:typeHashMember, moduleCode:CodeHashOpen},
              {moduleType:typeHashVote, moduleCode:CodeHashVoteYesNo}
            ],
            {from: user1}
          );
          daoOpenVoteYesNo.receipt.status.should.equal(true);
        })
        it("Check Dao Owner", async () => {
          addrDao = daoOpenVoteYesNo.logs[2].args.daoAddress;
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
          deployedDao.length.should.equal(4);
          deployedDao[deployedDao.length - 1].owner.should.equal(user1);
          deployedDao[deployedDao.length - 1].daoAddress.should.equal(addrDao);
        })
      })
      describe("Event", () => {
        it("check event OwnershipTransferred 1", async () => {
          const log = daoOpenVoteYesNo.logs[0];
          log.event.should.equal('OwnershipTransferred');
          const res = log.args;
          res.previousOwner.should.equal(ADDR0);
          res.newOwner.should.equal(DaosFactoryInstance.address);
        })
        it("check event OwnershipTransferred 2", async () => {
          const log = daoOpenVoteYesNo.logs[1];
          log.event.should.equal('OwnershipTransferred');
          const res = log.args;
          res.previousOwner.should.equal(DaosFactoryInstance.address);
          res.newOwner.should.equal(user1);
        })
        it("check event DaoCreated", async () => {
          const log = daoOpenVoteYesNo.logs[2];
          log.event.should.equal('DaoCreated');
          const res = log.args;
          res.user.should.equal(user1, "correct user");
          res.name.should.equal(name, "correct name");
        })
      })
      describe("VotingYesNoModule", () => {
        var votingYesNoModuleInstance;
        var addrVotingYesNoModule;
        it("Recover Invite Membership Module", async () => {
          votingYesNoModuleInstance = await VotingYesNoModule.deployed();
          addrVotingYesNoModule = votingYesNoModuleInstance.address
        })
        it("Add Authorized Address", async () => {
          const AuthorizedAddress = await votingYesNoModuleInstance
            .authorizeAddress(addrDao, user3, {from: user1})
          AuthorizedAddress.receipt.status.should.equal(true);
        })
        it("Check Authorized Address", async () => {
          const AuthorizedAddress = await votingYesNoModuleInstance
            .authorizedAddress(addrDao, user1);
          AuthorizedAddress.should.equal(true);
        })
        it("Deny Authorized Address", async () => {
          const denyAddress = await votingYesNoModuleInstance
            .denyAddress(addrDao, user3, {from: user1});
          denyAddress.receipt.status.should.equal(true);
        })
        it("Fail to Authorized Address when not Authorized", async () => {
          await votingYesNoModuleInstance
            .authorizeAddress(addrDao, addrVotingYesNoModule, {from: user2})
            .should.be.rejectedWith("VM Exception while processing transaction: revert Not authorized");
        })
        describe("VotingYesNo", () => {
          var voteSession;
          var name = "test vote";
          var description = "this is a test WAGMI";
          describe("Create Vote", () => {
            it("Check Vote Count equal 0", async () => {
              const voteCount = await votingYesNoModuleInstance.getVotesCount(addrDao);
              voteCount.toString().should.equal('0');
            })
            it("Create a New Vote", async () => {
              const oneDay = 1 * 24 * 60 * 60;
              voteSession = await votingYesNoModuleInstance
                .createVote(addrDao, name, description, oneDay, {from: user1});
              voteSession.receipt.status.should.equal(true);
            })
            it("Check Event", async () => {
              const log = voteSession.logs[0];
              log.event.should.equal('VoteSessionCreated');
              const res = log.args;
              res.creatorAddress.should.equal(user1);
              res.name.should.equal(name);
              res.description.should.equal(description);
              res.id.toString().should.equal('0');
            })
            it("Check Vote Count Equal 1", async () => {
              const voteCount = await votingYesNoModuleInstance.getVotesCount(addrDao);
              voteCount.toString().should.equal('1');
            })
            it("Check Vote Session Info", async () => {
              const currentBlock = await web3.eth.getBlock("latest");
              const voteSessionInfo = await votingYesNoModuleInstance
                .getVoteSessionInfo(addrDao, 0);
              voteSessionInfo.creatorAddress.should.equal(user1);
              voteSessionInfo.creationTime.toString().should.equal(currentBlock.timestamp.toString());
              voteSessionInfo.name.should.equal(name);
              voteSessionInfo.description.should.equal(description);
              voteSessionInfo.isTerminated.should.equal(false);
              voteSessionInfo.votersCount.toString().should.equal('0');
            })
            it("Failed To Create Bote When Not Member Of The DAO", async () => {
              await votingYesNoModuleInstance
                .createVote(addrDao, name, description, 1, {from: user4})
                .should.be.rejectedWith("VM Exception while processing transaction: revert Not DAO member");
            })
          })
          describe("Vote", () => {
            var newVote;
            it("Add Vote", async () => {
              const res = await votingYesNoModuleInstance.hasVoted(addrDao, 0, user1);
              res.should.equal(false);
              newVote = await votingYesNoModuleInstance.vote(addrDao, 0, 1, {from: user1});
              newVote.receipt.status.should.equal(true);
            })
            it("Check Event", async () => {
              const log = newVote.logs[0];
              log.event.should.equal('Voted');
              const res = log.args;
              res.voterAddress.should.equal(user1);
              res.voteSessionId.toString().should.equal('0');
              res.response.toString().should.equal("1");
            })
            it("Check Vote Status", async () => {
              const res = await votingYesNoModuleInstance.hasVoted(addrDao, 0, user1);
              res.should.equal(true);
            })
            it("Check Voter Count", async () => {
              const voterCount = await votingYesNoModuleInstance.getVotersCount(addrDao, 0);
              voterCount.toString().should.equal("1");
            })
            it("Fail to Vote Again", async () => {
              await votingYesNoModuleInstance.vote(addrDao, 0, 1, {from: user1})
                .should.be.rejectedWith("VM Exception while processing transaction: revert Already voted");
            })
          })
        })
      })
    })
  })
})