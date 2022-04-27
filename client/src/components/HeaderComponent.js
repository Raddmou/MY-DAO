import React, { useState, useContext, useEffect } from "react";
import DaosFactoryContract from "../contracts/DaosFactory.json";
import getWeb3 from "../getWeb3";
import { providerContext } from "../App";
import Button from 'react-bootstrap/Button';

import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/Connector";

const HeaderComponent = (props) => {
    const provider = useContext(providerContext);
    const { active, account, library, connector, activate, deactivate } = useWeb3React();

    useEffect(async () => {
        const connectWalletOnPageLoad = async () => {
            if (localStorage.getItem('isWalletConnected') === 'true') {
              try {
                await activate(injected)
                localStorage.setItem('isWalletConnected', true)
              } catch (ex) {
                console.log(ex)
              }
            }
          }
          connectWalletOnPageLoad()
	}, [provider]);

	// if(!provider)
	// 	return null;

    async function connect() {
        try {
          await activate(injected)
            localStorage.setItem('isWalletConnected', true)
            const networkId = await connector.getChainId();
            const deployedNetwork = DaosFactoryContract.networks[networkId];
            const instance = new connector.eth.Contract(
                DaosFactoryContract.abi,
            deployedNetwork && deployedNetwork.address,
            );
            //setProvider({web3: connector, accounts: callAccounts, contract: instance});
            console.log(library);
        } catch (ex) {
          console.log(ex)
        }
      }
    
      async function disconnect() {
        try {
          deactivate()
          localStorage.setItem('isWalletConnected', false)
        } catch (ex) {
          console.log(ex)
        }
      } 

    const getContent = () => {
        return (
            <div className="container">
                <div className="mb-3 d-flex flex-row justify-content-center">
                     <Button className="col" onClick={connect} variant="primary" >Connect to MetaMask</Button>
                     {active ? <span className="col">Connected with <b>{account}</b></span> : <span className="col">Not connected</span>}
                     <Button className="col" onClick={disconnect} >Disconnect</Button>
                </div>
            </div>
        );
    };

	return ( 
        <div className="header-app">
            <h1>MY DAO</h1>
            <div>
                {getContent()}
            </div>
        </div>
        
	);
}

export default HeaderComponent;