# Tests

> This document explains for each test why we wrote it

## Test Environment

We are using:
- [OpenZeppelin test-helpers](https://docs.openzeppelin.com/test-helpers)
- truffle test as a test runner engine
- [chai](https://www.npmjs.com/package/chai) for assertions


## Test Struture

We have implement a total of 159 tests. This tests are structured the same way as the protocol.
First we test DaosFactory, and we test after the module membership, module voting and module funds

### DAOS FACTORY

* Recover Daos Factory instance
* Check Daos Factory Datas
* Check Hash
* Check Modules
* Check add Module

### DAOS

#### DAO MODULE OPEN

#### * Init
* Create the Dao
* Check Owner
* Check Data
* Check Add Module
* Check Event
* Check Module Membership
* Recover Module
* Check Module Function for Owner
* Check Membership Data
* Check Join

### DAO MODULE INVITE

#### * Init
- Create the Dao
- Check Owner
* Check Data
* Check Add Module
* Check Event
#### * Check Module Membership
- Recover Module
- Check Module Function for Owner
- Check Membership Data
- Check Invite

### DAO MODULE REQUEST

#### * Init
- Create the Dao
- Check Owner
* Check Data
* Check Add Module
* Check Event
#### * Check Module Membership
- Recover Module
- Check Module Function for Owner
- Check Membership Data
- Check Invite

### DAO MODULE OPEN + VOTE YES NO

#### * Init
- Create the Dao
- Check Owner
* Check Data
* Check Add Module
* Check Event
#### * Check Module Voting
- Recover Module
- Check Module Function for Owner
- Check Voting Data
- Check Voting

### DAO MODULE OPEN + SIMPLE DONATIONS

#### * Init
- Create the Dao
- Check Owner
* Check Data
* Check Add Module
* Check Event
#### * Check Module Funds
- Recover Module
- Check Module Function for Owner
- Check Donations Data
- Check Donation