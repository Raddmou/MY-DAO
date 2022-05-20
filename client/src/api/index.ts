import Web3 from 'web3';
import { v4 as uuidv4 } from 'uuid';

import { CONTACT_ABI, CONTACT_ADDRESS } from '../constants';
// import { getCitizensIdsToSearch } from './utils';
import { getDaosIdsToSearch } from './utils';
import { Dao, VoteSession} from '../types';
import daoFactoryContract from "../contracts/DaosFactory.json";
import { useAppSelector } from '../hooks';
import { Contract } from 'web3-eth-contract';
import { contractFactoryProvider, contractDaoProvider, contractMembershipModuleProvider, contractInviteMembershipModuleProvider, contractOpenMembershipModuleProvider, contractRequestMembershipModuleProvider, contractVotingYesNoModuleProvider } from './ContractProvider';
import { Address } from 'cluster';
import { FETCH_DAOS_COUNT } from '../redux/reducers/actionTypes';
import { MODULE_MEMBER_CODE_INVITE, MODULE_MEMBER_CODE_OPEN, MODULE_MEMBER_CODE_REQUEST
    , MODULE_MEMBER_TYPE, MODULE_VOTE_CODE_YESNO, MODULE_VOTE_TYPE} from '../redux/reducers/moduleTypes';
//import { contractProvider } from './ContractProvider';

const NOT_FOUND = 'City not found';
const WRONG_FORMAT_MESSAGE = 'Decoded with wrong format.'

const provider = 
    (window as any).ethereum || 
    (window as any).web3?.currentProvider;
const web3 = new Web3(provider);

// const contract = await contractProvider.getContract();

export const daosAPI = {
    
    // getCitizensCount: async (): Promise<number> => {
    //     const contract = await contractFactoryProvider.getContract();
    //     const events =  await contract.getPastEvents('Citizen', {
    //         fromBlock: 0,
    //         toBlock: 'latest'
    //     });

    //     return events.length;
    // },

    getDaoCount: async (): Promise<number> => {
        const contract = await contractFactoryProvider.getContract();
        const events =  await contract.getPastEvents('DaoCreated', {
            fromBlock: 0,
            toBlock: 'latest'
        });

        return events.length;
    },

    getDaoCountByUser: async (): Promise<number> => {
        console.log("getDaoCountByUserrr");
        const contract = await contractFactoryProvider.getContract();
        console.log("ici ");
        const allDaos = await contract.methods.getdeployedDaos().call();
        console.log("la ");
        
        //const count = allDaos.filter(c => c.members[(window as any).ethereum.selectedAddress].status != 0).length;
        const transactionsData =  allDaos
                                    .map(async (deployedAddress) => {
                                        // const address = deployedAddress.daoAddress;
                                        // const contractDao = await contractDaoProvider.getContract(address.daoAddress);
                                        // const typeHashMemberModule = await contractDao.methods.hash("MemberModule").call();
                                        // const moduleMembership = await contractDao.methods.modules(typeHashMemberModule).call();
                                        // const typeHashVoteModule = await contractDao.methods.hash("VotingModule").call();
                                        // const moduleVote = await contractDao.methods.modules(typeHashVoteModule).call();
                                        // var member;
                                        // var isMember;
                                        // var membershipMode;
                                        // var membersCount;
                                        // var members = [];
                                        // var modules = [];
                                        
                                        // if(moduleMembership.isActive && moduleMembership.moduleCode != "0x0000000000000000")
                                        // {
                                        //     const contractMembershipModule = await contractMembershipModuleProvider.getContract(moduleMembership.moduleAddress, moduleMembership.moduleCode);
                                        //     member = await contractMembershipModule.methods.members((window as any).ethereum.selectedAddress).call();
                                        //     isMember = member != 0;
                                        //     //membershipMode = await contractMembershipModule.methods.getMemberShipMode().call();
                                        //     membersCount = await contractMembershipModule.methods.membersCount().call();
                                        //     for (var i = 0; i < membersCount; i++) {
                                        //         const memberAddress = await contractMembershipModule.methods.memberAddresses(i).call();
                                        //         console.log("memberAddress " + memberAddress);
                                        //         const memberInfo = await contractMembershipModule.methods.getMemberInfo(memberAddress).call();
                                        //         var myMember = {status: memberInfo, address: memberAddress, id: i}
                                        //         members.push(myMember);
                                        //     } 
                                        //     modules.push({type: "MemberModule", code: "MembershipModule"});
                                        // }
                                        // if(moduleVote.isActive)
                                        // {
                                        //     modules.push({type: "VotingModule", code: "VotingYesNoModule"});
                                        // }
                                        // // const contractMembershipModule = await contractMembershipModuleProvider.getContract(moduleMembership.moduleAddress, codeHash);
                                        // // const member = await contractMembershipModule.methods.members((window as any).ethereum.selectedAddress).call();
                                        // // const isMember = member != 0;
                                        // return { address, isMember };

                                        return daosAPI.fetchDao(deployedAddress.daoAddress);
                                    });
        return transactionsData.filter(a => a.isMember).length;
    },

    getPublicDaoCount: async (): Promise<number> => {
        const contract = await contractFactoryProvider.getContract();
        const allDaos = await contract.methods.getdeployedDaos().call();
        
        const transactionsData =  allDaos
                                    .map(async (deployedAddress) => {
                                        // const address = deployedAddress.daoAddress;
                                        // const contractDao = await contractDaoProvider.getContract(address.daoAddress);
                                        // const typeHashMemberModule = await contractDao.methods.hash("MemberModule").call();
                                        // const moduleMembership = await contractDao.methods.modules(typeHashMemberModule).call();
                                        // const typeHashVoteModule = await contractDao.methods.hash("VotingModule").call();
                                        // const moduleVote = await contractDao.methods.modules(typeHashVoteModule).call();
                                        // var member;
                                        // var isMember;
                                        // var membershipMode;
                                        // var membersCount;
                                        // var members = [];
                                        // var modules = [];
                                        
                                        // if(moduleMembership.isActive && moduleMembership.moduleCode != "0x0000000000000000")
                                        // {
                                        //     const contractMembershipModule = await contractMembershipModuleProvider.getContract(moduleMembership.moduleAddress, moduleMembership.moduleCode);
                                        //     member = await contractMembershipModule.methods.members((window as any).ethereum.selectedAddress).call();
                                        //     isMember = member != 0;
                                        //     //membershipMode = await contractMembershipModule.methods.getMemberShipMode().call();
                                        //     membersCount = await contractMembershipModule.methods.membersCount().call();
                                        //     for (var i = 0; i < membersCount; i++) {
                                        //         const memberAddress = await contractMembershipModule.methods.memberAddresses(i).call();
                                        //         console.log("memberAddress " + memberAddress);
                                        //         const memberInfo = await contractMembershipModule.methods.getMemberInfo(memberAddress).call();
                                        //         var myMember = {status: memberInfo, address: memberAddress, id: i}
                                        //         members.push(myMember);
                                        //     } 
                                        //     modules.push({type: "MemberModule", code: "MembershipModule"});
                                        // }
                                        // if(moduleVote.isActive)
                                        // {
                                        //     modules.push({type: "VotingModule", code: "VotingYesNoModule"});
                                        // }
                                        // // const contractMembershipModule = await contractMembershipModuleProvider.getContract(moduleMembership.moduleAddress, codeHash);
                                        // // const member = await contractMembershipModule.methods.members((window as any).ethereum.selectedAddress).call();
                                        // // const isMember = member != 0;
                                        // return { address, isMember };

                                        return daosAPI.fetchDao(deployedAddress.daoAddress);
                                    });
        return transactionsData.length;
    },

    fetchDaosByUser: async (page: number, limit: number, count: number): Promise<Dao[]> => {
        const contractFactory = await contractFactoryProvider.getContract();
        // const citizenIds = getCitizensIdsToSearch(page, limit, count);
        
        const allDaos = await contractFactory.methods.getdeployedDaos().call();

        //const allDaos = await contract.methods.membershipDaos().call();

        // const transactionsData =  allDaos.filter(c => c.members[(window as any).ethereum.selectedAddress].status != 0)
        //                             .map(async (deployedDao) => {
        //                                 const daoAddress = deployedDao.returnValues.daoAddress;
        //                                 const name = await provider.contract.methods.name.call();
        //                                 const visibility = await provider.contract.methods.visibility.call();
        //                                 const membershipModeMode = await provider.contract.methods.membershipModeMode.call();
        //                                 return { daoAddress, name, visibility, membershipModeMode };
        //                             });
        const transactionsData =  allDaos
                                    .map(async (deployedAddress) => {
                                        // const address = deployedAddress.daoAddress;
                                        // const contractDao = await contractDaoProvider.getContract(address.daoAddress);
                                        // const typeHashMemberModule = await contractDao.methods.hash("MemberModule").call();
                                        // const moduleMembership = await contractDao.methods.modules(typeHashMemberModule).call();
                                        // const typeHashVoteModule = await contractDao.methods.hash("VotingModule").call();
                                        // const moduleVote = await contractDao.methods.modules(typeHashVoteModule).call();
                                        // var member;
                                        // var isMember;
                                        // var membershipMode;
                                        // var membersCount;
                                        // var members = [];
                                        // var modules = [];
                                        
                                        // if(moduleMembership.isActive && moduleMembership.moduleCode != "0x0000000000000000")
                                        // {
                                        //     const contractMembershipModule = await contractMembershipModuleProvider.getContract(moduleMembership.moduleAddress, moduleMembership.moduleCode);
                                        //     member = await contractMembershipModule.methods.members((window as any).ethereum.selectedAddress).call();
                                        //     isMember = member != 0;
                                        //     //membershipMode = await contractMembershipModule.methods.getMemberShipMode().call();
                                        //     membersCount = await contractMembershipModule.methods.membersCount().call();
                                        //     for (var i = 0; i < membersCount; i++) {
                                        //         const memberAddress = await contractMembershipModule.methods.memberAddresses(i).call();
                                        //         console.log("memberAddress " + memberAddress);
                                        //         const memberInfo = await contractMembershipModule.methods.getMemberInfo(memberAddress).call();
                                        //         var myMember = {status: memberInfo, address: memberAddress, id: i}
                                        //         members.push(myMember);
                                        //     } 
                                        //     modules.push({type: "MemberModule", code: "MembershipModule"});
                                        // }
                                        // if(moduleVote.isActive)
                                        // {
                                        //     modules.push({type: "VotingModule", code: "VotingYesNoModule"});
                                        // }
                                        // // const contractMembershipModule = await contractMembershipModuleProvider.getContract(moduleMembership.moduleAddress, codeHash);
                                        // // const member = await contractMembershipModule.methods.members((window as any).ethereum.selectedAddress).call();
                                        // // const isMember = member != 0;
                                        // return { address, isMember };
                                        console.log("loop fetchDaosByUser");
                                        return daosAPI.fetchDao(deployedAddress.daoAddress);
                                        
                                    });
                                    // .filter(a => a.isMember == true);
        
        console.log(" fetchDaosByUser transactionsData " + transactionsData.length);

        return (await Promise.all(transactionsData)).filter(a => a.isMember || a.isOwner);

    },

    fetchPublicDaos: async (page: number, limit: number, count: number): Promise<Dao[]> => {
        const contractFactory = await contractFactoryProvider.getContract();
        const allDaos = await contractFactory.methods.getdeployedDaos().call();

        const transactionsData =  allDaos
                                    .map(async (deployedAddress) => {
                                        // const address = deployedAddress.daoAddress;
                                        // const contractDao = await contractDaoProvider.getContract(address);
                                        // const typeHash = await contractDao.methods.hash("MemberModule").call();
                                        // const moduleMembership = await contractDao.methods.modules(typeHash).call();
                                        // const contractMembershipModule = await contractMembershipModuleProvider.getContract(moduleMembership.moduleAddress, moduleMembership.moduleCode);
                                        // const member = await contractMembershipModule.methods.members((window as any).ethereum.selectedAddress).call();
                                        // const isMember = member != 0;
                                        // const name = await contractDao.methods.getName().call();
                                        // const visibility = await contractDao.methods.getVisibility().call();
                                        // const description = await contractDao.methods.getDescription().call();
                                        // //const membershipMode = await contractMembershipModule.methods.getMemberShipMode().call();
                                        // // const membersCount = await contractDao.methods.membersCount().call();
                                        // // console.log("membersCount " + membersCount);
                                        // // var members = [];
                                        // // for (var i = 0; i < membersCount; i++) {
                                        // //     const memberAddress = await contractDao.methods.memberAddresses(i).call();
                                        // //     console.log("memberAddress " + memberAddress);
                                        // //     const memberInfo = await contractDao.methods.getMemberInfo(memberAddress).call();
                                        // //     var myMember = {status: memberInfo, address: memberAddress}
                                        // //     members.push(myMember);
                                        // // } 
                                        
                                        // const id = address.toString();
                                        // return { id, address, isMember, name, visibility, description, member };
                                        
                                        return daosAPI.fetchDao(deployedAddress.daoAddress);
                                    });
                                    // .filter(a => a.isMember == true);

        console.log("transactionsData " + transactionsData.length);

        return (await Promise.all(transactionsData));

    },

    // getDao: async (address: Address): Promise<Dao> => {

    // }

    

    fetchDao: async (address: Address): Promise<Dao> => {
        console.log("fetchDao start " +  address);
        const contractDao = await contractDaoProvider.getContract(address);
        const typeHashMemberModule = await contractDao.methods.hash("MemberModule").call();
        const typeHashVoteModule = await contractDao.methods.hash("VotingModule").call();
        const moduleMembership = await contractDao.methods.modules(typeHashMemberModule).call();
        const moduleVote = await contractDao.methods.modules(typeHashVoteModule).call();
        console.log("fetchDao MemberModule " +  moduleMembership.moduleType + " moduleCode " + moduleMembership?.moduleCode);
        console.log("fetchDao VoteModule " +  moduleVote.moduleType + " moduleCode " + moduleVote?.moduleCode);
        var memberConnectedInfo;
        var isMember;
        var membershipMode;
        var membersCount;
        var members = [];
        var modules = [];

        const typehashedrequest = await contractDao.methods.hash("RequestMembershipModule").call();
        console.log("hashed RequestMembershipModule " + typehashedrequest);
        
        if(moduleMembership.isActive && moduleMembership.moduleCode != "0x0000000000000000")
        {
            console.log("fetchDao moduleMembership.moduleAddress " +  moduleMembership.moduleAddress + " moduleMembership.moduleCode " + moduleMembership.moduleCode);
            const contractMembershipModule = await contractMembershipModuleProvider.getContract(moduleMembership.moduleAddress, moduleMembership.moduleCode);
            memberConnectedInfo = await contractMembershipModule.methods.getMemberInfo(address, (window as any).ethereum.selectedAddress).call();
            isMember = memberConnectedInfo.status != 0;
            //membershipMode = await contractMembershipModule.methods.getMemberShipMode().call();
            membersCount = await contractMembershipModule.methods.getMembersCount(address).call();
            for (var i = 0; i < membersCount; i++) {
                const memberAddress = await contractMembershipModule.methods.getAddrById(address, i).call();
                console.log("memberAddress " + memberAddress);
                const memberInfo = await contractMembershipModule.methods.getMemberInfo(address, memberAddress).call();
                var myMember = {status: memberInfo.status, address: memberAddress, id: i}
                members.push(myMember);
            } 
            modules.push({type: moduleMembership.moduleType, code: moduleMembership.moduleCode});
        }
        if(moduleVote.isActive && moduleVote.moduleCode != "0x0000000000000000")
        {
            modules.push({type: moduleVote.moduleType, code: moduleVote.moduleCode});
        }

        const name = await contractDao.methods.name().call();
        const visibility = await contractDao.methods.visibility().call();
        const isVisible = visibility == 1;
        const description = await contractDao.methods.description().call(); 
        const note = await contractDao.methods.rules().call();     
        const owner = await contractDao.methods.owner().call();
        const isOwner = owner.toLowerCase() == (window as any).ethereum.selectedAddress.toLowerCase();
        const id = address.toString();
        var member = memberConnectedInfo?.status;
        return { id, address, name, isVisible, membershipMode, description, member, members, isMember, isOwner, modules, note };

        //return (await Promise.all(transactionsData));
        
    },

    fetchVoteSessions: async (address: Address): Promise<VoteSession[]> => {
        console.log("fetchVote start " +  address);
        const contractDao = await contractDaoProvider.getContract(address);
        const moduleVote = await contractDao.methods.modules(MODULE_VOTE_TYPE).call();
        console.log("fetchDao VoteModule " +  moduleVote.moduleType + " moduleCode " + moduleVote?.moduleCode);
        var votes = [];
        
        if(moduleVote.isActive && moduleVote.moduleCode != "0x0000000000000000")
        {
            const contractVoteYesNoModule = await contractVotingYesNoModuleProvider.getContract(moduleVote.moduleAddress);
            var votesCount = await contractVoteYesNoModule.methods.getVotesCount(address).call();

            console.log(" vote count " + votesCount);
            console.log(" vote module address " + moduleVote.moduleAddress);
            
            //foreach vote session
            if(votesCount > 0)
            {
                for (let i = 0; i < votesCount; i++) {
                    var voters = [];
                    //General infos:
                    console.log(" compteur i " + i);
                    var voteSessionInfo =  await contractVoteYesNoModule.methods.getVoteSessionInfo(address, i).call();
                    console.log(" voteSessionInfo " + voteSessionInfo?.name);
                    //vote resuluts:
                    var votersCount = await contractVoteYesNoModule.methods.getVotersCount(address, i).call();
                    console.log(" votersCount " + votersCount);
                    //foreach voter in a vote session
                    var voteResult = [];
                    if(votersCount > 0)
                    {
                        for (let j = 0; j < votersCount.length; j++) {
                            console.log(" compteur j " + j);
                            var voterAdress = await contractVoteYesNoModule.methods.getVoterAddressById(address, i, j).call();
                            console.log(" voterAdress " + voterAdress);
                            voters.push(voterAdress);
                            var voteInfo = await contractVoteYesNoModule.methods.getVoteInfo(address, i, voterAdress).call();
                            console.log(" voteInfo " + voteInfo);
                            voteResult.push({response: voteInfo.response
                                , voter: voteInfo.voterAdress
                                , voted: voteInfo.voted});
                        }
                    }
                    votes.push({creationTime: voteSessionInfo.creationTime
                        , name: voteSessionInfo.name
                        , description: voteSessionInfo.description
                        , isTerminated: voteSessionInfo.isTerminated
                        , votersCount: voteSessionInfo.votersCount
                        , voters: voters
                        , voteResult: voteResult
                        , duration: voteSessionInfo.duration
                        , id: i
                    });
                }
            }
        }

        console.log(" votes output fetchVoteSessions " + votes.length);
        return  votes;
    },

    // fetchCitizens: async (page: number, limit: number, count: number): Promise<Citizen[]> => {
    //     const contract = await contractFactoryProvider.getContract();
    //     const citizenIds = getCitizensIdsToSearch(page, limit, count);
        
    //     const events =  await contract.getPastEvents('Citizen', {
    //         filter: {id: citizenIds},
    //         fromBlock: 0,
    //         toBlock: 'latest'
    //     });

    //     const transactionsData = events.map(async ({ transactionHash, returnValues: { id, age, name } }) => {
    //         try {
    //             const contract = await contractFactoryProvider.getContract();
    //             const { input }  = await web3.eth.getTransaction(transactionHash);
    //             const parametersTypes = [
    //                 { type: 'uint256', name: 'age' },
    //                 { type: 'string', name: 'city' },
    //                 { type: 'string', name: 'name' },
    //             ];
    //             const { city } = web3.eth.abi.decodeParameters(parametersTypes, input.slice(10));
    //             const isCityHex = web3.utils.isHex(city);

    //             if (isCityHex) throw new Error(WRONG_FORMAT_MESSAGE);

    //             return { id, age, name, city };
    //         } catch(error) {
    //             console.error(error);

    //             return { id, age, name, city: NOT_FOUND };
    //         }
    //     })

    //     return await Promise.all(transactionsData);
    // },

    fetchNote: async (id: string): Promise<string> => {
        const contract = await contractFactoryProvider.getContract();
        return await contract.methods.getNoteByCitizenId(id).call();
    },

    fetchDescription: async (address: Address): Promise<string> => {
        const contract = await contractDaoProvider.getContract(address);
        return await contract.methods.getDescription().call();
    },

    // addNewCitizen: async (citizen: any): Promise<Citizen> => {
    //     const contract = await contractFactoryProvider.getContract();
    //     const { age, name, city, note } = citizen;
    //     const { events } =  await contract.methods
    //         .addCitizen(age, city, name, note)
    //         .send({ 
    //             from: (window as any).ethereum.selectedAddress 
    //         });
    //     const id = events?.Citizen?.returnValues?.id || uuidv4();

    //     return { id, age, name, city };
    // },

    addNewDao: async (dao: any, module: any): Promise<Dao> => {
        const contract = await contractFactoryProvider.getContract();
        const { name, visibility, description, modules, note } = dao;
        //const byInvitation = membershipMode == 0;
        const visibilityEnum = visibility ? 1 : 0;
        console.log('module =>' + module);
        var { member, vote } = module;
        const typeHashMember = await contract.methods.hash("MemberModule").call();
        var codeHashMember;
        switch (member) {
            case 'open':
                codeHashMember = MODULE_MEMBER_CODE_OPEN;
                break;
            case 'invite':
                codeHashMember = MODULE_MEMBER_CODE_INVITE;
                break;
            case 'request':
                codeHashMember = MODULE_MEMBER_CODE_REQUEST;
                break;
            default:
                console.log("Need to choose one member module");
        }
        console.log("codeHashMember module member to create " + codeHashMember);
        member = { moduleType: typeHashMember, moduleCode: codeHashMember };
        const typeHashVote = await contract.methods.hash("VotingModule").call();
        var codeHashVote;
        switch (vote) {
            case 'votingSimple':
                codeHashVote = await contract.methods.hash("VotingYesNoModule").call();
                break;
            case 'votingProposition':
                codeHashVote = await contract.methods.hash("AAA").call();
                break;
            default:
                codeHashVote = null;
        }
        console.log("codeHashVote module vote to create " + codeHashVote);
        vote = { moduleType: typeHashVote, moduleCode: codeHashVote };
        const modulesPush = [];
        if(codeHashMember !== null)
            modulesPush.push(member);
        if(codeHashVote !== null)
            modulesPush.push(vote);
        //const modulesPush = [ member, vote ];
        console.log("name="+name,"\ndescription="+description,"\nvisibilityEnum="+visibilityEnum+"\nmodules="+modulesPush);
        for (let index = 0; index < modulesPush.length; index++) {
            console.log(" loop " + modulesPush[index].moduleType + " " + modulesPush[index].moduleCode);
        }
        // const res = await contract.methods.modulesDaos(typeHashMember, codeHashMember).call();
        // console.log("modulesDaos"+res);
        const { events } =  await contract.methods
            .createDAO(name, description, visibilityEnum, note, modulesPush)
            // .createDAO(name, membershipMode, description, visibility)
            //.createDAO(name, false, description, visibility)
            .send({ 
                from: (window as any).ethereum.selectedAddress 
            });
        const address = events?.DaoCreated?.returnValues?.daoAddress;
        const id = address.toString();

        return { id, name, visibility, description, address, modules, note };
    },

    addNewVote: async (address: any, vote: any): Promise<VoteSession> => {
        const contractDao = await contractDaoProvider.getContract(address);
        const { name, duration, description } = vote;

        const moduleVote = await contractDao.methods.modules(MODULE_VOTE_TYPE).call();
        const contractVoteYesNoModule = await contractVotingYesNoModuleProvider.getContract(moduleVote.moduleAddress);       
        
        const { events } =  await contractVoteYesNoModule.methods
            .createVote(address, name, description, duration)
            .send({ 
                from: (window as any).ethereum.selectedAddress 
            });
        const id = address.toString();

        return { id, name, description, duration };
    },

    joinDao: async (address: Address): Promise<boolean> => {
        const contractDao = await contractDaoProvider.getContract(address);
        const typeHash = await contractDao.methods.hash("MemberModule").call();
        const moduleMembership = await contractDao.methods.modules(typeHash).call();
        const contractMembershipModule = await contractInviteMembershipModuleProvider.getContract(moduleMembership.moduleAddress);

        await contractMembershipModule.methods.join(address).send({ 
            from: (window as any).ethereum.selectedAddress })
			.on("receipt",function(receipt){
				console.log(receipt);  
                return true;
			})
			.on("error",function(error, receipt){
				console.log(error);
				console.log(receipt);
                return false;
			});		

        // const success =  await contractDao.methods
        //     .join()
        //     .send({ 
        //         from: (window as any).ethereum.selectedAddress 
        //     });
        // console.log("success " + success.returnValues);
        return true;
        
    },

    acceptMember: async (address: Address, addressMember: Address): Promise<boolean> => {
        const contractDao = await contractDaoProvider.getContract(address);
        const typeHash = await contractDao.methods.hash("MemberModule").call();
        const moduleMembership = await contractDao.methods.modules(typeHash).call();
        const contractMembershipModule = await contractRequestMembershipModuleProvider.getContract(moduleMembership.moduleAddress);


        await contractMembershipModule.methods.acceptMember(address, addressMember).send({ 
            from: (window as any).ethereum.selectedAddress })
			.on("receipt",function(receipt){
				console.log(receipt);  
                return true;
			})
			.on("error",function(error, receipt){
				console.log(error);
				console.log(receipt);
                return false;
			});		
        return true;
        
    },

    requestJoinDao: async (address: Address): Promise<boolean> => {
        const contractDao = await contractDaoProvider.getContract(address);
        const typeHash = await contractDao.methods.hash("MemberModule").call();
        const moduleMembership = await contractDao.methods.modules(typeHash).call();
        const contractMembershipModule = await contractRequestMembershipModuleProvider.getContract(moduleMembership.moduleAddress);


        await contractMembershipModule.methods.requestJoin(address).send({ 
            from: (window as any).ethereum.selectedAddress })
			.on("receipt",function(receipt){
				console.log(receipt);  
                return true;
			})
			.on("error",function(error, receipt){
				console.log(error);
				console.log(receipt);
                return false;
			});		
        return true;
        
    },

    inviteToDao: async (address: Address, addressToInvite: Address): Promise<boolean> => {
        const contractDao = await contractDaoProvider.getContract(address);
        const moduleMembership = await contractDao.methods.modules(MODULE_MEMBER_TYPE).call();
        const contractMembershipModule = await contractInviteMembershipModuleProvider.getContract(moduleMembership.moduleAddress);


        await contractMembershipModule.methods.inviteMember(address, addressToInvite).send({ 
            from: (window as any).ethereum.selectedAddress })
			.on("receipt",function(receipt){
				console.log(receipt);  
                return true;
			})
			.on("error",function(error, receipt){
				console.log(error);
				console.log(receipt);
                return false;
			});		
        return true;
        
    },

    voteYesNo: async (address: Address, voteSession: number, response: number): Promise<boolean> => {
        const contractDao = await contractDaoProvider.getContract(address);
        const moduleVote = await contractDao.methods.modules(MODULE_VOTE_TYPE).call();
        const contractVoteModule = await contractVotingYesNoModuleProvider.getContract(moduleVote.moduleAddress);


        await contractVoteModule.methods.vote(address, voteSession, response).send({ 
            from: (window as any).ethereum.selectedAddress })
			.on("receipt",function(receipt){
				console.log(receipt);  
                return true;
			})
			.on("error",function(error, receipt){
				console.log(error);
				console.log(receipt);
                return false;
			});		
        return true;
        
    },

    linkMemberModule: async (address: Address, code: string): Promise<boolean> => {
        const contractDao = await contractDaoProvider.getContract(address);
        const typeHash = await contractDao.methods.hash("MemberModule").call();
        var codeHash;
        switch (code) {
            case 'open':
                codeHash = MODULE_MEMBER_CODE_OPEN;
                break;
            case 'invite':
                codeHash = MODULE_MEMBER_CODE_INVITE;
                break;
            case 'request':
                codeHash = MODULE_MEMBER_CODE_INVITE;
                break;
            default:
                console.log("Need to choose a member module");
                return false;
        }
        // const codeHash = await contractDao.methods.hash("OpenMembershipModule").call();
        
        if(code)
        {
            await contractDao.methods.activateModuleForDao(address, MODULE_MEMBER_TYPE, codeHash)
                .send({from: (window as any).ethereum.selectedAddress})
                .on("receipt",function(receipt){
                    console.log(receipt);  
                    return true;
                })
                .on("error",function(error, receipt){
                    console.log(error);
                    console.log(receipt);
                    return false;
                });
        }
        return true;
    }
};