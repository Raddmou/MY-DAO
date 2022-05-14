import Web3 from 'web3';
import { v4 as uuidv4 } from 'uuid';

import { CONTACT_ABI, CONTACT_ADDRESS } from '../constants';
// import { getCitizensIdsToSearch } from './utils';
import { getDaosIdsToSearch } from './utils';
import { Dao } from '../types';
import daoFactoryContract from "../contracts/DaosFactory.json";
import { useAppSelector } from '../hooks';
import { Contract } from 'web3-eth-contract';
import { contractFactoryProvider, contractDaoProvider, contractMembershipModuleProvider } from './ContractProvider';
import { Address } from 'cluster';
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
        const contract = await contractFactoryProvider.getContract();
        const allDaos = await contract.methods.getdeployedDaos().call();
        
        //const count = allDaos.filter(c => c.members[(window as any).ethereum.selectedAddress].status != 0).length;
        const transactionsData =  allDaos
                                    .map(async (deployedAddress) => {
                                        const address = deployedAddress.daoAddress;
                                        const contractDao = await contractDaoProvider.getContract(address.daoAddress);
                                        const typeHash = await contractDao.methods.hash("MemberModule").call();
                                        const moduleMembership = await contractDao.methods.modules(typeHash).call();
                                        const contractMembershipModule = await contractMembershipModuleProvider.getContract(moduleMembership.moduleAddress);
                                        const member = await contractMembershipModule.methods.members((window as any).ethereum.selectedAddress).call();
                                        const isMember = member != 0;
                                        return { address, isMember };
                                    });
        return transactionsData.filter(a => a.isMember).length;
    },

    getPublicDaoCount: async (): Promise<number> => {
        const contract = await contractFactoryProvider.getContract();
        const allDaos = await contract.methods.getdeployedDaos().call();
        
        const transactionsData =  allDaos
                                    .map(async (deployedAddress) => {
                                        const address = deployedAddress.daoAddress;
                                        const contractDao = await contractDaoProvider.getContract(address.daoAddress);
                                        const typeHash = await contractDao.methods.hash("MemberModule").call();
                                        const moduleMembership = await contractDao.methods.modules(typeHash).call();
                                        const contractMembershipModule = await contractMembershipModuleProvider.getContract(moduleMembership.moduleAddress);
                                        const member = await contractMembershipModule.methods.members((window as any).ethereum.selectedAddress).call();
                                        const isMember = member != 0;
                                        return { address, isMember };
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
                                        const address = deployedAddress.daoAddress;
                                        const contractDao = await contractDaoProvider.getContract(address);
                                        const typeHash = await contractDao.methods.hash("MemberModule").call();
                                        const moduleMembership = await contractDao.methods.modules(typeHash).call();
                                        var member;
                                        var isMember;
                                        var membershipMode;
                                        if(moduleMembership.isActive)
                                        {
                                             console.log("moduleMembership " + moduleMembership.isActive );
                                            console.log( "moduleMembership" + moduleMembership.moduleAddress + "here");
                                            // const tt = contractDao.methods.
                                            const contractMembershipModule = await contractMembershipModuleProvider.getContract(moduleMembership.moduleAddress);
                                            member = await contractMembershipModule.methods.members((window as any).ethereum.selectedAddress).call();
                                            isMember = member != 0;
                                            const membershipMode = await contractMembershipModule.methods.getMemberShipMode().call();
                                        }
                                        
                                        const name = await contractDao.methods.name().call();
                                        const visibility = await contractDao.methods.visibility().call();
                                        const isVisible = visibility == 1;
                                        const description = await contractDao.methods.description().call();
                                        const owner = await contractDao.methods.owner().call();
                                        const isOwner = owner.toLowerCase() == (window as any).ethereum.selectedAddress.toLowerCase();
                                        console.log( "owner " + owner + " " + (window as any).ethereum.selectedAddress + " "+ isOwner);
                                        
                                        const id = address.toString();
                                        return { id, address, isMember, name, isVisible, membershipMode, description, member, isOwner };
                                        // console.log("deployedDao.daoAddress " + deployedDao.daoAddress);
                                        // const contractDao = await contractDaoProvider.getContract(deployedDao.daoAddress);
                                        // console.log("contractDao " + contractDao.methods);
                                        // const name = await contractDao.methods.name.call();
                                        
                                    });
                                    // .filter(a => a.isMember == true);

        return (await Promise.all(transactionsData)).filter(a => a.isMember || a.isOwner);

    },

    fetchPublicDaos: async (page: number, limit: number, count: number): Promise<Dao[]> => {
        const contractFactory = await contractFactoryProvider.getContract();
        const allDaos = await contractFactory.methods.getdeployedDaos().call();

        const transactionsData =  allDaos
                                    .map(async (deployedAddress) => {
                                        const address = deployedAddress.daoAddress;
                                        const contractDao = await contractDaoProvider.getContract(address);
                                        const typeHash = await contractDao.methods.hash("MemberModule").call();
                                        const moduleMembership = await contractDao.methods.modules(typeHash).call();
                                        const contractMembershipModule = await contractMembershipModuleProvider.getContract(moduleMembership.moduleAddress);
                                        const member = await contractMembershipModule.methods.members((window as any).ethereum.selectedAddress).call();
                                        const isMember = member != 0;
                                        const name = await contractDao.methods.getName().call();
                                        const visibility = await contractDao.methods.getVisibility().call();
                                        const description = await contractDao.methods.getDescription().call();
                                        const membershipMode = await contractMembershipModule.methods.getMemberShipMode().call();
                                        // const membersCount = await contractDao.methods.membersCount().call();
                                        // console.log("membersCount " + membersCount);
                                        // var members = [];
                                        // for (var i = 0; i < membersCount; i++) {
                                        //     const memberAddress = await contractDao.methods.memberAddresses(i).call();
                                        //     console.log("memberAddress " + memberAddress);
                                        //     const memberInfo = await contractDao.methods.getMemberInfo(memberAddress).call();
                                        //     var myMember = {status: memberInfo, address: memberAddress}
                                        //     members.push(myMember);
                                        // } 
                                        
                                        const id = address.toString();
                                        return { id, address, isMember, name, visibility, membershipMode, description, member };
                                    });
                                    // .filter(a => a.isMember == true);

        console.log("transactionsData " + transactionsData[0]);

        return (await Promise.all(transactionsData));

    },

    fetchDao: async (address: Address): Promise<Dao> => {

        const contractDao = await contractDaoProvider.getContract(address);
        const typeHash = await contractDao.methods.hash("MemberModule").call();
        const moduleMembership = await contractDao.methods.modules(typeHash).call();
        var member;
        var isMember;
        var membershipMode;
        var membersCount;
        var members = [];
        var modules = [];
        if(moduleMembership.isActive)
        {
            const contractMembershipModule = await contractMembershipModuleProvider.getContract(moduleMembership.moduleAddress);
            member = await contractMembershipModule.methods.members((window as any).ethereum.selectedAddress).call();
            isMember = member != 0;
            membershipMode = await contractMembershipModule.methods.getMemberShipMode().call();
            membersCount = await contractMembershipModule.methods.membersCount().call();
            for (var i = 0; i < membersCount; i++) {
                const memberAddress = await contractMembershipModule.methods.memberAddresses(i).call();
                console.log("memberAddress " + memberAddress);
                const memberInfo = await contractMembershipModule.methods.getMemberInfo(memberAddress).call();
                var myMember = {status: memberInfo, address: memberAddress, id: i}
                members.push(myMember);
            } 
            modules.push({type: "MemberModule", code: "MembershipModule"});
        }

        const name = await contractDao.methods.name().call();
        const visibility = await contractDao.methods.visibility().call();
        const isVisible = visibility == 1;
        const description = await contractDao.methods.description().call();     
        const id = address.toString();
        return { id, address, name, isVisible, membershipMode, description, member, members };

        //return (await Promise.all(transactionsData));

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

    addNewDao: async (dao: any): Promise<Dao> => {
        const contract = await contractFactoryProvider.getContract();
        const { name, visibility, description, membershipMode } = dao;
        //const byInvitation = membershipMode == 0;
        const visibilityEnum = visibility ? 1 : 0;
        const { events } =  await contract.methods
        .createDAO(name, description, visibilityEnum)
            // .createDAO(name, membershipMode, description, visibility)
            //.createDAO(name, false, description, visibility)
            .send({ 
                from: (window as any).ethereum.selectedAddress 
            });
        const address = events?.DaoCreated?.returnValues?.daoAddress;
        const id = address.toString();

        return { id, name, visibility, membershipMode, description, address };
    },

    joinDao: async (address: Address): Promise<boolean> => {
        const contractDao = await contractMembershipModuleProvider.getContract(address);
        const typeHash = await contractDao.methods.hash("MemberModule").call();
        const moduleMembership = await contractDao.methods.modules(typeHash).call();
        const contractMembershipModule = await contractMembershipModuleProvider.getContract(moduleMembership.moduleAddress);

        await contractMembershipModule.methods.join().send({ 
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
        const contractMembershipModule = await contractMembershipModuleProvider.getContract(moduleMembership.moduleAddress);


        await contractMembershipModule.methods.acceptMember(addressMember).send({ 
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
        const contractMembershipModule = await contractMembershipModuleProvider.getContract(moduleMembership.moduleAddress);


        await contractMembershipModule.methods.requestJoin().send({ 
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
        const typeHash = await contractDao.methods.hash("MemberModule").call();
        const moduleMembership = await contractDao.methods.modules(typeHash).call();
        const contractMembershipModule = await contractMembershipModuleProvider.getContract(moduleMembership.moduleAddress);


        await contractMembershipModule.methods.inviteMember(addressToInvite).send({ 
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
        
    }
};