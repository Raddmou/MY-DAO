import React, { Component, useState, useEffect, createContext, useContext } from "react";
import HeaderComponent from "./HeaderComponent";
import DaosFactoryContract from "../contracts/DaosFactory.json";
import getWeb3 from "../getWeb3";
import Button from 'react-bootstrap/Button';
import Web3 from "web3";




export const providerContext = createContext({web3: null, accounts: null, contract: null});

const MainComponent = (props) => {
    const [provider, setProvider] = useState();
    const [isOwner, setIsOwner] = useState(null);
    

	useEffect(async () => {
        
	}, [provider]);

    

    

    const handleConnect = async () => {

		// Récupérer le provider web3
		//const callWeb3 = await getWeb3();
        const callWeb3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        console.log("ici ");
  
		// Utiliser web3 pour récupérer les comptes de l’utilisateur (MetaMask dans notre cas) 
		const callAccounts = await callWeb3.eth.getAccounts();
  
		// Récupérer l’instance du smart contract “Voting” avec web3 et les informations du déploiement du fichier (client/src/contracts/Voting.json)
		const networkId = await callWeb3.eth.net.getId();

		const deployedNetwork = DaosFactoryContract.networks[networkId];

		const instance = new callWeb3.eth.Contract(
			DaosFactoryContract.abi,
		  deployedNetwork && deployedNetwork.address,
		);

		setProvider({web3: callWeb3, accounts: callAccounts, contract: instance});
	};

    // if (!provider)
    //     return null;

    return ( 

        <HeaderComponent />
    );
}

export default MainComponent;