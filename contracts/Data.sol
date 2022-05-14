// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library Data {
  struct member {
    memberStatus status;
    uint256 joinTime;
    //address memberAddress;
  }

  struct DaoSettings {
    visibilityEnum visibility;
    membershipModeEnum membershipMode;
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
    // IModule module;
    bool isActive;
    bytes8 moduleType; //member
    bytes8 moduleCode; //membership
    string moduleInfo;
  }
}