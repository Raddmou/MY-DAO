// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
* @title Data
* @author chixx.eth & mourad
* @notice Library of struct and enum for MY-DAO
*/
library Data {
  /**
  * @notice store member
  * @return status the status of the member
  * @return joinTime timestamp of the time the member join the dao
  */
  struct member {
    memberStatus status;
    uint256 joinTime;
    //address memberAddress;
  }

  /**
  * @notice store dao info & members
  * @return addressDao the address of the dao
  * @return membersCount the total count of dao members
  * @return memberAddresses the member address linked to his id
  * @return members the member struct linked to his address
  * @return isActive true or false is the member is active
  */
  struct DaoMember {
    address addressDao;
    uint256 membersCount;
    mapping(uint256 => address) memberAddresses;
    mapping(address => Data.member) members;
    bool isActive;
  } 

  /**
  * @notice store dao settings
  * @return addressDao the address of the dao
  * @return visibility the visibility of the dao
  * @return name the name of the dao
  * @return description the description of the dao
  * @return rules true rules of the dao
  */
  struct DaoSettings {
    address addressDao;
    visibilityEnum visibility;
    string name;
    string description;
    string rules;
  } 

  // /**
  // * @notice store dao data
  // * @return daoType the type 
  // * @return visibility the visibility of the dao
  // */
  // struct daoData {
  //   string daoType;
  //   visibilityEnum visibility;
  // }

  /**
  * @notice store module data
  * @return id the id of the module
  * @return moduleAddress the address of the module
  * @return isActive true or false if active
  * @return isExclusive true or false if exclusive
  * @return moduleType hash of the module type
  * @return moduleCode hash of the module code
  * @return moduleInfo info of the module
  */
  struct Module {
    uint256 id;
    address moduleAddress;
    bool isActive;
    bool isExclusive;
    bytes8 moduleType; 
    bytes8 moduleCode; 
    string moduleInfo;
  }

  /**
  * @notice store module hash
  * @return moduleType the type hash of the module
  * @return moduleCode the code hash of the module
  */
  struct ModuleToActivate {
    bytes8 moduleType;
    bytes8 moduleCode;
  }

  /**
  * @notice enum for the visibility of the dao
  * @return privateDao dao is private
  * @return publicDao dao is public
  */
  enum visibilityEnum {
    privateDao,
    publicDao
  }

  /**
  * @notice enum for the status of a member
  * @return notMember user not a member
  * @return invited user invited
  * @return asking user asking
  * @return active user active
  */
  enum memberStatus {
    notMember,
    invited,
    asking,
    active
  }

  /**
  * @notice enum for membership mode
  * @return invite invite module
  * @return request request module
  * @return open open module
  */
  enum membershipModeEnum {
    invite,
    request,
    open
  }

  // /**
  // * @notice enum for module type
  // * @return DaoMemberSystem user not a member
  // * @return DaoVotingSystem user invited
  // */
  // enum ModuleType {
  //   DaoMemberSystem,
  //   DaoVotingSystem
  // }
}