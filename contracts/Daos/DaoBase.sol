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
  uint256 public modulesCount;

  mapping(address => bool) private authorizedContracts;
  mapping(address => bool) owners;
  mapping(uint256 => bytes32) code;
  mapping(bytes32 => Data.Module) modules;

  modifier onlyOwners() {
    require(owners[msg.sender], "Invalid User");
    _;
  }
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
    owners[msg.sender] = true;
  }

  // function activateModule(ModuleType _moduleType, bytes8 memory code) external onlyOwners() {
  //     modules[code].isActive = true;
  //     modules[code].moduleAddress = _moduleAddress;
  //     emit ModuleAdded(code, _moduleAddress, msg.sender);
  // }
  function hash(string memory _name) public pure returns(bytes32) {
    return (keccak256(abi.encodePacked(_name)));
  }
  
//   function activateModule(address _moduleAddress, string memory code) external {
//       modules[code].isActive = true;
//       modules[code].moduleAddress = _moduleAddress;
//       emit ModuleAdded(code, _moduleAddress, msg.sender);
//   }

  function addModule(bytes32 _code, address _moduleAddr) public onlyOwners() {
    modules[_code].isActive = true;
    modules[_code].id = modulesCount;
    modules[_code].moduleAddress = _moduleAddr;
    code[modulesCount] = _code;
    ++modulesCount;
  }

  function authorizeContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
    authorizedContracts[_contractAddress] = true;
  }

  function denyContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
    authorizedContracts[_contractAddress] = false;
  }

  // get info
  function getAllModuleHash() public view returns(bytes32[] memory allModuleHash) {
    allModuleHash = new bytes32[](modulesCount);
    for (uint256 i = 0; i < modulesCount; ++i) {
      allModuleHash[i] = code[i];
    }
  }
  function getAllModulesData() public view returns(Data.Module[] memory allModuleData) {
    allModuleData = new Data.Module[](modulesCount);
    for (uint256 i = 0; i < modulesCount; ++i) {
      allModuleData[i] = modules[code[i]];
    }
  }
  function getModuleData(uint256 _moduleId) public view returns(Data.Module memory) {
    return(modules[code[_moduleId]]);
  }
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