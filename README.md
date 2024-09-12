# MY-DAO

## Table of contents
* [Intro](#intro)
* [General info](#general-info)
* [Objective](#objective)
* [Concept](#concept)
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

## Concept

My-DAO allows you to create, with an intuitive interface, without prior technical knowledge, a CAD.
The user can create a DAO, providing:
- name
- description
- Rules (contract governing the DAO)
- visibility
By also choosing modules.
The modules have the following characteristics:
- A category or type
- A sub-category or an implementation: each type of category can contain several implementations, thus giving the user the choice to personalize his DAO by choosing an appropriate implementation for his use. For example the Membership type contains several implementaions such as OpenMembership or InviteMembership
- Mandatory: The membership module is mandatory for example to be able to manage the members of the DAO
- exclusive: determines if we can choose several implementations for the same type

OpenMembership module:
- a new member can join a DAO freely, without validation of existing members. Provided that the DAO is public

InviteMembership module:
- A new member can only join a DAO following the invitation of a member of the DAO.
- The new member sees his "guest" status at the DAO level. He can then accept the invitation to join the DAO.

RequestMembership module:
- A new member can only join a DAO following a membership request.
- Any DAO member can view the new membership application and accept it
- Following acceptance of the membership application, the member becomes a member of the DAO

Module VoteYesNo:
- allows you to create voting sessions.
- Voters can vote by Yes or No to a statement.
- any member can create a voting session.
- A voting session has the following characteristics:
    - name
    - description
    - duration
- each member has the right to vote only once.
- All member votes have the same weight
- At the end of the time allowed for the vote, the result is displayed

## Team
CP:
- Anaïs
- Claude

Dev:
- Mourad
    - [LinkedIn](linkedin.com/in/mourad-mouttaki)
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
`$ cd MY-DAO`
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
* Enter client
`$ cd client`
* Install depedency using npm or yarn:
`$ npm install`
* Start app
`$ npm run start`

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

| Contract Name                 | Address                                    |  Etherscan Rinkeby
|---                            |---                                         |  -- 
| `DaosFactory`                 | 0xdeC378F2fbC3047c6a677091FbC62EdaC145A373 |  [Link](https://rinkeby.etherscan.io/address/0xdeC378F2fbC3047c6a677091FbC62EdaC145A373)
| `InviteMembershipModule`      | 0xAdC50C4bC192d660Db2b70CaF469E59128433aBa |  [link](https://rinkeby.etherscan.io/address/0xAdC50C4bC192d660Db2b70CaF469E59128433aBa)
| `OpenMembershipModule`        | 0xc2a730E39562Bd22cbb3084e5Fe2bC106Df2722A |  [link](https://rinkeby.etherscan.io/address/0xc2a730E39562Bd22cbb3084e5Fe2bC106Df2722A)  
| `RequestMembershipModule`     | 0xC6F3e58943aC206befF3BF6B69b286cC684f90aF |  [link](https://rinkeby.etherscan.io/address/0xC6F3e58943aC206befF3BF6B69b286cC684f90aF)
| `VotingYesNoModule`           | 0xB1BaE72c50E5F472C6aEc39aD3695Be78DC509e2 |  [link](https://rinkeby.etherscan.io/address/0xB1BaE72c50E5F472C6aEc39aD3695Be78DC509e2)
| `SimpleDonationsModule`       | 0xfdb5BBa2493bd4f7c5011ee29aadd392B5eD6f31 |  [link](https://rinkeby.etherscan.io/address/0xfdb5BBa2493bd4f7c5011ee29aadd392B5eD6f31)
| Example of `DaoBase`          | 0xf2b1596d32737bF6AB6DE4Dd6A732858AE2Dd33C |  [link](https://rinkeby.etherscan.io/address/0xf2b1596d32737bF6AB6DE4Dd6A732858AE2Dd33C)

## Docs

Dev documentation:
-   [Avoiding Common Attacks](./docs/avoiding_common_attacks.md)
-   [Deployed Addresses](./docs/deployed_addresses.md)
-   [Design Pattern Decisions](./docs/design_pattern_decisions.md)
-   [Diagrams](./docs/diagrams/README.md)
-   [Test Explication](./docs/tests_explication.md)
-   [Smart Contracts README.MD](./docs/contracts/)

Diagrams:

-   [Macro diagram](./Diagrams/Macro/MacroDiagram.png)
-   [Create DAO sequence](./Diagrams/Sequences/createDao_sequenceDiagram.png)
-   [Fetch DAO sequence](./Diagrams/Sequences/fetchDao_sequenceDiagram.png)
-   [join Open DAO](./Diagrams/Sequences/joinOpenDao_sequenceDiagram.png)
-   [join Request DAO](./Diagrams/Sequences/joinRequestDao_SequenceDiagram.png)
-   [join Invite DAO](./Diagrams/Sequences/joinInviteDao_sequenceDiagram.png)
-   [Vote Yes No](./Diagrams/Sequences/voteYesNo_sequenceDiagram.png)

## Copyright

License MIT

Copyright (C) 2022
