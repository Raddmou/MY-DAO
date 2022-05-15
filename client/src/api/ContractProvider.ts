import Web3 from 'web3';
import daoFactoryContract from "../contracts/DaosFactory.json";
import daoContract from "../contracts/DaoBase.json";
import openMembershipContract from "../contracts/OpenMembershipModule.json";
import inviteMembershipContract from "../contracts/InviteMembershipModule.json";
import requestMembershipContract from "../contracts/RequestMembershipModule.json";
import votingContract from "../contracts/VotingYesNoModule.json";
import { useAppSelector } from '../hooks';
import { Contract } from 'web3-eth-contract';

export const contractFactoryProvider = {
    getContract: async (): Promise<Contract> => {
        const provider = 
        (window as any).ethereum || 
        (window as any).web3?.currentProvider;

        const web3 = new Web3(provider);

        //const { chainId } = useAppSelector((state: any) => state.application);

        const [ chainId ] = await provider.request({
            method: 'eth_chainId'
        });
        // const [ networkId ] = await provider.request({
        //     method: 'net_version'
        // });
        const networkId = await web3.eth.net.getId();

        console.log("chainId " + chainId);
        console.log("networkId " + networkId);
        //console.log("networkId2 " + networkId2);
        

        const deployedNetwork = daoFactoryContract.networks[networkId];
        const contract = new web3.eth.Contract(daoFactoryContract.abi as any, deployedNetwork.address);

        console.log("deployedNetwork " + deployedNetwork.address);

        return contract;
    },    
}

export const contractDaoProvider = {
    getContract: async (address): Promise<Contract> => {
        const provider = 
        (window as any).ethereum || 
        (window as any).web3?.currentProvider;

        const web3 = new Web3(provider);
        const networkId = await web3.eth.net.getId();
        const contract = new web3.eth.Contract(daoContract.abi as any, address);

        return contract;
    },    
}

export const contractMembershipModuleProvider = {
    getContract: async (address, moduleCode): Promise<Contract> => {
        const provider = 
        (window as any).ethereum || 
        (window as any).web3?.currentProvider;
        var contract;

        const web3 = new Web3(provider);
        switch(moduleCode) {
            case 'OpenMembershipModule':
                contract = new web3.eth.Contract(openMembershipContract.abi as any, address);
            case 'InviteMembershipModule':
                contract = new web3.eth.Contract(inviteMembershipContract.abi as any, address);
            case 'RequestMembershipModule':
                contract = new web3.eth.Contract(requestMembershipContract.abi as any, address);
          }      
        
        return contract;
    },    
}

export const contractOpenMembershipModuleProvider = {
    getContract: async (address): Promise<Contract> => {
        const provider = 
        (window as any).ethereum || 
        (window as any).web3?.currentProvider;

        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(openMembershipContract.abi as any, address);

        return contract;
    },    
}

export const contractInviteMembershipModuleProvider = {
    getContract: async (address): Promise<Contract> => {
        const provider = 
        (window as any).ethereum || 
        (window as any).web3?.currentProvider;

        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(inviteMembershipContract.abi as any, address);

        return contract;
    },    
}

export const contractRequestMembershipModuleProvider = {
    getContract: async (address): Promise<Contract> => {
        const provider = 
        (window as any).ethereum || 
        (window as any).web3?.currentProvider;

        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(requestMembershipContract.abi as any, address);

        return contract;
    },    
}

export const contractVotingYesNoModuleProvider = {
    getContract: async (address): Promise<Contract> => {
        const provider = 
        (window as any).ethereum || 
        (window as any).web3?.currentProvider;

        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(votingContract.abi as any, address);

        return contract;
    },    
}
