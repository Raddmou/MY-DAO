import Web3 from 'web3';
import daoFactoryContract from "../contracts/DaosFactory.json";
import daoContract from "../contracts/DaosFactory.json";
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
        const [ networkId ] = await provider.request({
            method: 'net_version'
        });
        const networkId2 = await web3.eth.net.getId();

        console.log("chainId " + chainId);
        console.log("networkId " + networkId);
        console.log("networkId2 " + networkId2);
        

        const deployedNetwork = daoFactoryContract.networks[networkId2];
        const contract = new web3.eth.Contract(daoFactoryContract.abi as any, deployedNetwork.address);

        console.log("deployedNetwork " + deployedNetwork.address);
        console.log("contract " + contract);

        return contract;
    },    
}

export const contractDaoProvider = {
    getContract: async (): Promise<Contract> => {
        const provider = 
        (window as any).ethereum || 
        (window as any).web3?.currentProvider;

        const web3 = new Web3(provider);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = daoContract.networks[networkId];
        const contract = new web3.eth.Contract(daoContract.abi as any, deployedNetwork.address);

        return contract;
    },    
}
