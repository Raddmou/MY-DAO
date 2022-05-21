// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/*
* @title Data
* @author chixx.eth & mourad
* @notice Library of struct and enum for MY-DAO
*/
library Data {
  struct member {
    memberStatus status;
    uint256 joinTime;
    //address memberAddress;
  }

  struct DaoMember {
    address addressDao;
    uint256 membersCount;
    mapping(uint256 => address) memberAddresses;
    mapping(address => Data.member) members;
    bool isActive;
  } 

  struct DaoSettings {
    address addressDao;
    visibilityEnum visibility;
    string name;
    string description;
    string rules;
  } 

  struct daoData {
    string daoType;
    visibilityEnum visibility;
  }

  enum visibilityEnum {
    privateDao,
    publicDao
  }

  enum memberStatus {
    notMember,
    invited,
    asking,
    active
  }

  enum membershipModeEnum {
    invite,
    request,
    open
  }

  enum ModuleType {
    DaoMemberSystem,
    DaoVotingSystem
  }

  struct Module {
    uint256 id;
    address moduleAddress;
    bool isActive;
    bool isExclusive;
    bytes8 moduleType; 
    bytes8 moduleCode; 
    string moduleInfo;
  }

  struct ModuleToActivate {
    bytes8 moduleType;
    bytes8 moduleCode;
  }

  function hash(string memory _messageToHash) public pure returns (bytes8) {
    return bytes8(keccak256(abi.encode(_messageToHash)));
  }
}