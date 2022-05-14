// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Dao.sol";
import "../Data.sol";
import "./Interfaces/IDao.sol";
import "./Interfaces/IModule.sol";

contract DaoBase is Ownable {
  string public name;
  string public description;
  Data.visibilityEnum public visibility;
  mapping(address => bool) private authorizedContracts;
  uint256 public modulesCount;
  
  // mapping(uint256 => address) modules;
  //string[] public modules;
  mapping(string => Module) modules;

  //type: adhesion > membership - nft - token
  //type: vote > vote yes no - vote assemblée generale...

  // modifier onlyActiveMembersOrAuthorizeContracts() {
  //       require(members[msg.sender].status == Data.memberStatus.active || authorizedContracts[msg.sender] == true, "Not authorized");
  //       _;
  //   }

  //   modifier onlyNotActiveMembers() {
  //       require(members[msg.sender].status != Data.memberStatus.active, "Not authorized");
  //       _;
  //   }

    modifier onlyAuthorizeContracts() {
        require(authorizedContracts[msg.sender] == true, "Not authorized");
        _;
    }

    modifier onlyAuthorizeContractsOrOwner() {
        require(((authorizedContracts[msg.sender] == true) || msg.sender == owner()), "Not authorized");
        _;
    }

  event DaoCreated(address daoAddress, address creatorAddress);
  event ModuleAdded(string moduleCode, address moduleAddress, address adderAddress);

  constructor(string memory _name, string memory _description, uint8 _visibility) {
      name = _name;
      description = _description;
      visibility = Data.visibilityEnum(_visibility);
  }

  function activateModule(ModuleType _moduleType, string memory code, address _moduleAddress) external {
      modules[code].isActive = true;
      modules[code].moduleAddress = _moduleAddress;
      emit ModuleAdded(code, _moduleAddress, msg.sender);
  }
  
//   function activateModule(address _moduleAddress, string memory code) external {
//       modules[code].isActive = true;
//       modules[code].moduleAddress = _moduleAddress;
//       emit ModuleAdded(code, _moduleAddress, msg.sender);
//   }

  // function addModule(string memory code) public {
  //     modules[code].isActive = true;
  //     modules[code].id = modulesCount;
  //     ++modulesCount;
  //     IDao
  // }

  function authorizeContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
        authorizedContracts[_contractAddress] = true;
    }

    function denyContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
        authorizedContracts[_contractAddress] = false;
    }

  // // get info
  // function memberInfo(address _member) external view returns(Data.member memory) {
  //   return(IDao(modules[0]).getMemberInfo(_member));
  // }
  // function addrId(uint256 _id) external view returns(address) {
  //   return(IDao(modules[0]).getAddrById(_id));
  // }
  // function totalId() external view returns(uint256) {
  //   return(IDao(modules[0]).getTotalId());
  // }
  // function daoInfo() external view returns(Data.daoData memory) {
  //   return(IDao(modules[0]).getInfoDao());
  // }
  // add new modules
  // function addModule(address _newModule) external {
  //   modules.push(_newModule);
  // }
}