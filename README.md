# MY-DAO

## Table of contents
* [Intro](#intro)
* [General info](#general-info)
* [Objective](#objective)
* [Setup](#setup)
* [Test](#test)
* [Demo](#demo)

## Intro
MY-DAO it's a protocol that let you create you'r own DAO without any programming knowledge
* Differents smart-contracts for each Module (Membership, vote, funds)
* Simplified method for create you'r DAO and gas efficient
* Interact with ur DAO directly on you'r protocol

## Objective
* Democratize the use of DAOs and bring it to the general public
* Bring transparency and autonomy of governance to any group of people
* Assist in the self-management and transparency 
* Offer associations and horizontal organizations a framework for collegial decision-making, Crowdfunding, etc.
* Driving Governance 3.0
* Help humanitarian associations to collect and redistribute around the world

## General info
React application based on smart contract using web3, MetaMask extention, truffle & ganache.

## Setup 
Recommend to install MetaMask extention and create ethereum wallet before starting the application. https://metamask.io/

### To run this project
* Clone the repository
`git clone git@github.com:Raddmou/MY-DAO.git`
* Enter MY-DAO
`$ cd MY-DAO/`
* Install depedency using npm or yarn:
`$ npm install`
* Open ganache cli or app in another terminal
`$ ganache-cli`
* Migrate smart-contract on ganache
`$ truffle migrate --reset`
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
App is deployed to test here: https://raddmou.github.io/MY-DAO/