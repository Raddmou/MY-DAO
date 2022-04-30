import Web3 from 'web3';
import { v4 as uuidv4 } from 'uuid';

import { CONTACT_ABI, CONTACT_ADDRESS } from '../constants';
import { getCitizensIdsToSearch } from './utils';
import { Citizen, Dao } from '../types';
import daoFactoryContract from "../contracts/DaosFactory.json";
import { useAppSelector } from '../hooks';
import { Contract } from 'web3-eth-contract';
import { contractProvider } from './ContractProvider';
//import { contractProvider } from './ContractProvider';

const NOT_FOUND = 'City not found';
const WRONG_FORMAT_MESSAGE = 'Decoded with wrong format.'

const provider = 
    (window as any).ethereum || 
    (window as any).web3?.currentProvider;
const web3 = new Web3(provider);

// const contract = await contractProvider.getContract();

export const citizensAPI = {
    
    getCitizensCount: async (): Promise<number> => {
        const contract = await contractProvider.getContract();
        const events =  await contract.getPastEvents('Citizen', {
            fromBlock: 0,
            toBlock: 'latest'
        });

        return events.length;
    },

    getDaoCount: async (): Promise<number> => {
        const contract = await contractProvider.getContract();
        const events =  await contract.getPastEvents('DaoCreated', {
            fromBlock: 0,
            toBlock: 'latest'
        });

        return events.length;
    },

    getDaoCountByUser: async (): Promise<number> => {
        const contract = await contractProvider.getContract();
        const allDaos = await contract.methods.getdeployedDaos().call();
        const count = allDaos.filter(c => c.members.some(e => e.status != "notMember" && e.memberAddress == (window as any).ethereum.selectedAddress)).length;
        return count;
    },

    fetchDaosByUser: async (page: number, limit: number, count: number): Promise<Citizen[]> => {
        const contract = await contractProvider.getContract();
        const citizenIds = getCitizensIdsToSearch(page, limit, count);
        
        const allDaos = await contract.methods.getdeployedDaos().call();
        //const myDaos[];
        const daos = allDaos.filter(c => c.members.some(e => e.status != "notMember" && e.memberAddress == (window as any).ethereum.selectedAddress));
                            // .map((data) => {
                                
                            // });
        

        return daos;
    },

    fetchCitizens: async (page: number, limit: number, count: number): Promise<Citizen[]> => {
        const contract = await contractProvider.getContract();
        const citizenIds = getCitizensIdsToSearch(page, limit, count);
        
        const events =  await contract.getPastEvents('Citizen', {
            filter: {id: citizenIds},
            fromBlock: 0,
            toBlock: 'latest'
        });

        const transactionsData = events.map(async ({ transactionHash, returnValues: { id, age, name } }) => {
            try {
                const contract = await contractProvider.getContract();
                const { input }  = await web3.eth.getTransaction(transactionHash);
                const parametersTypes = [
                    { type: 'uint256', name: 'age' },
                    { type: 'string', name: 'city' },
                    { type: 'string', name: 'name' },
                ];
                const { city } = web3.eth.abi.decodeParameters(parametersTypes, input.slice(10));
                const isCityHex = web3.utils.isHex(city);

                if (isCityHex) throw new Error(WRONG_FORMAT_MESSAGE);

                return { id, age, name, city };
            } catch(error) {
                console.error(error);

                return { id, age, name, city: NOT_FOUND };
            }
        })

        return await Promise.all(transactionsData);
    },

    fetchNote: async (id: string): Promise<string> => {
        const contract = await contractProvider.getContract();
        return await contract.methods.getNoteByCitizenId(id).call();
    },

    addNewCitizen: async (citizen: any): Promise<Citizen> => {
        const contract = await contractProvider.getContract();
        const { age, name, city, note } = citizen;
        const { events } =  await contract.methods
            .addCitizen(age, city, name, note)
            .send({ 
                from: (window as any).ethereum.selectedAddress 
            });
        const id = events?.Citizen?.returnValues?.id || uuidv4();

        return { id, age, name, city };
    },

    addNewDao: async (dao: any): Promise<Dao> => {
        const contract = await contractProvider.getContract();
        const { name } = dao;
        const { events } =  await contract.methods
            .createDAO(name)
            .send({ 
                from: (window as any).ethereum.selectedAddress 
            });
        const id = events?.DaoCreated?.returnValues?.id || uuidv4();

        return { id, name };
    }
};