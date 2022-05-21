// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Data.sol";

/*
* @title DaoBase
* @author chixx.eth & mourad
* @notice DaoBase is deployed every time DaosFactory create a new dao. DaoBase store all the
* modules for the dao
*/
contract DaoBase is Ownable {
  string public name;
  string public description;
  string public rules;
  Data.visibilityEnum public visibility;
  uint256 public modulesCount;

  mapping(address => bool) private authorizedContracts;
  mapping(uint256 => bytes8) public moduleType;
  mapping(bytes8 => Data.Module) public modules;

  event DaoCreated(address daoAddress, address creatorAddress);
  event ModuleAdded(string moduleCode, address moduleAddress, address adderAddress);

  modifier onlyAuthorizeContracts() {
    require(authorizedContracts[msg.sender] == true, "Not authorized");
    _;
  }

  modifier onlyAuthorizeContractsOrOwner() {
    require(((authorizedContracts[msg.sender] == true) || msg.sender == owner()), "Not authorized");
    _;
  }

  constructor(
    string memory _name,
    string memory _description,
    Data.visibilityEnum _visibility,
    string memory _rules
  ) {
    name = _name;
    description = _description;
    rules = _rules;
    visibility = _visibility;
  }

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
}