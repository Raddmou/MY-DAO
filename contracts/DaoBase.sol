// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Data.sol";

contract DaoBase is Ownable {
  string public name;
  string public description;
  string public rules;
  Data.visibilityEnum public visibility;
  uint256 public modulesCount;

  mapping(address => bool) private authorizedContracts;
  mapping(address => bool) owners;
  mapping(uint256 => bytes8) public moduleType;
  mapping(bytes8 => Data.Module) public modules;
  // type => module {code, type, descr}
  // member => module { "nft member", "", ""}

  //membership => module
  //nft member => module

  //type => module

  modifier onlyOwners() {
    require(owners[msg.sender], "Invalid User: DaoBase");
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

  constructor(string memory _name, string memory _description, Data.visibilityEnum _visibility
            , string memory _rules) {
    name = _name;
    description = _description;
    rules = rules;
    visibility = _visibility;
    owners[msg.sender] = true;
  }

  // function activateModule(ModuleType _moduleType, bytes8 memory code) external onlyOwners() {
  //     modules[code].isActive = true;
  //     modules[code].moduleAddress = _moduleAddress;
  //     emit ModuleAdded(code, _moduleAddress, msg.sender);
  // }
  function hash(string memory _name) public pure returns(bytes8) {
    return (bytes8(keccak256(abi.encode(_name))));
  }
  
//   function activateModule(address _moduleAddress, string memory code) external {
//       modules[code].isActive = true;
//       modules[code].moduleAddress = _moduleAddress;
//       emit ModuleAdded(code, _moduleAddress, msg.sender);
//   }


  function addModule(bytes8 _type, bytes8 _code, address _moduleAddr) public onlyAuthorizeContractsOrOwner() {
    modules[_type].isActive = true;
    modules[_type].id = modulesCount;
    modules[_type].moduleAddress = _moduleAddr;
    modules[_type].moduleCode = _code;
    modules[_type].moduleType = _type;
    moduleType[modulesCount] = _type;
    ++modulesCount;
  }

  function authorizeContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
    authorizedContracts[_contractAddress] = true;
  }

  function denyContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
    authorizedContracts[_contractAddress] = false;
  }

  // get info
  // function getAllModuleHash() public view returns(bytes8[] memory allModuleHash) {
  //   allModuleHash = new bytes8[](modulesCount);
  //   for (uint256 i = 0; i < modulesCount; ++i) {
  //     allModuleHash[i] = moduleType[i];
  //   }
  // }
  // function getAllModulesData() public view returns(Data.Module[] memory allModuleData) {
  //   allModuleData = new Data.Module[](modulesCount);
  //   for (uint256 i = 0; i < modulesCount; ++i) {
  //     allModuleData[i] = modules[moduleType[i]];
  //   }
  // }
  // function getModuleData(uint256 _moduleId) public view returns(Data.Module memory) {
  //   return(modules[moduleType[_moduleId]]);
  // }

  function getModuleData(bytes8 _type) public view returns(Data.Module memory) {
    return(modules[_type]);
  }

  function getDaoSettings() public view returns(Data.DaoSettings memory) {
    Data.DaoSettings memory daoSettings;
    daoSettings.name = name;
    daoSettings.description = description;
    daoSettings.visibility = visibility;
    return daoSettings;
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