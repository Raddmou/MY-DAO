# MY-DAO

## Table of contents
* [Intro](#intro)
* [General info](#general-info)
* [Objective](#objective)
* [Team](#team)
* [Setup](#setup)
* [Test](#test)
* [Demo](#demo)
* [Deployed Addresses](#DeployedAddresses)
* [Docs](#Docs)
* [Copyright & License](#Copyright)

## Intro
MY-DAO is a plateform for creating, customizing, deploying and intereacting with DAO:
- Customize your DAO, add modules and features (Membership, vote, funds and more)
- Differents smart-contracts for each Module.
- User friendly plateform, let your create your DAO without knwowledge and without code
- Simplified smart contracts methods for create DAO and gas efficient
- Interact with your DAO directly on the plateform

## Objective
* Democratize the use of DAOs and bring it to the general public
* Bring transparency and autonomy of governance to any group of people
* Assist in the self-management and transparency 
* Offer associations and horizontal organizations a framework for collegial decision-making, Crowdfunding, etc.
* Driving Governance 3.0
* Help humanitarian associations to collect and redistribute around the world

## Team
CP:
- Anaïs
- Claude

Dev:
- Mourad
    - [LinkedIn](https://www.linkedin.com/in/mourad-mouttaki-85b48a84/)
    - [GitHub](https://github.com/Raddmou)
- Jérémie
    - Linkedin
    - [Github](https://github.com/Chinoiserie1)

## General info
React application based on smart contract using web3, MetaMask extention, truffle & ganache.

## Setup 
Recommend to install MetaMask extention and create ethereum wallet before starting the application. https://metamask.io/

### To run this project
* Clone the repository
`$ git clone git@github.com:Raddmou/MY-DAO.git`
* Enter MY-DAO
`$ cd MY-DAO/`
* rename .env.example in .env and configure it by adding your parameters. Example:
    - `MNEMONIC=Your mnemonic`
    - `INFURA_API_KEY=your infura API key`
* Install depedency using npm or yarn:
`$ npm install`
* Deploy smarts contracts after coosing your chain. Examples:
    - Ganache:
        * Open ganache cli or app in another terminal
        * Standard Ethereum port: 7545
        * Network Id: 5777
        `$ ganache-cli`
        * Migrate smart-contract on ganache
        `$ truffle deploy -- reset --network developpement `
    - Rinkeby:
        * Migrate smart-contract on rinkeby
        `$ truffle deploy -- reset --network rinkeby`
* Start app
`$ npm start`

## Test
To lunch test of all smart-contract
* Open a terminal in root
`$ cd MY-DAO/`
* Open ganache cli or app in another terminal
`$ ganache-cli`
* Run all test
`$ truffle test test/DaosFactory.test.js`


## Demo
App is deployed to test here (rinkeby): https://raddmou.github.io/MY-DAO/


## DeployedAddresses

This section contains the list of the deployed contract addresses on the Ethereum testnet `rinkeby`.

| Contract Name     | Address                                    |
|---                |---                                         |
| `aa`              | aa                                         |

## Docs

Dev documentation:
-   [Avoiding Common Attacks](./docs/avoiding_common_attacks.md)
-   [Deployed Addresses](./docs/deployed_addresses.md)
-   [Design Pattern Decisions](./docs/design_pattern_decisions.md)
-   [Natspec](./docs/natspec/)
-   [Test Explication](./docs/test_explication.md)
-   [Smart Contracts README.MD](./docs/contracts/)

## Copyright

License MIT

Copyright (C) 2022