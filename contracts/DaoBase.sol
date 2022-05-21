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
  /*
  * @title name
  * @notice name of the dao
  */
  string public name;

  /*
  * @title description
  * @notice description of the dao
  */
  string public description;

  /*
  * @title rules
  * @notice rules of the dao
  */
  string public rules;

  /*
  * @title visibility
  * @notice visibility of the dao if anyone can see it on MY-DAO protocol
  */
  Data.visibilityEnum public visibility;

  /*
  * @title modulesCount
  * @notice counter of modules of the dao
  */
  uint256 public modulesTypeCount;

  /*
  * @title authorizedContracts
  * @notice store address that can interact with only owner functions
  * @param 0: address of a user or a contract
  * return true or false if the address is authorized
  */
  mapping(address => bool) private authorizedContracts;

  /*
  * @title moduleType
  * @notice 
  * @param 0: id of the module
  * return module type hash
  */
  mapping(uint256 => bytes8) public moduleType;

  /*
  * @title modules
  * @notice store module info
  * @param 0: type hash
  * return array of module, module type & code hash see >/Data.sol
  */
  mapping(bytes8 => Data.Module[]) public modules;

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

  function addModule(bytes8 _type, bytes8 _code, address _moduleAddr, bool _isExclusive) public onlyAuthorizeContractsOrOwner() {
    Data.Module memory newModule;
    newModule.isActive = true;
    newModule.isExclusive = _isExclusive;
    newModule.id = modulesTypeCount;
    newModule.moduleAddress = _moduleAddr;
    newModule.moduleCode = _code;
    newModule.moduleType = _type;
    if(modules[_type].length == 0) {
      moduleType[modulesTypeCount] = _type;
      ++modulesTypeCount;
    } else {
      require(modules[_type][0].isExclusive == false, "Already have this type of module");
    }
    modules[_type].push(newModule);
  }

  function authorizeContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
    authorizedContracts[_contractAddress] = true;
  }

  function denyContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
    authorizedContracts[_contractAddress] = false;
  }

  function getModuleData(bytes8 _type) public view returns(Data.Module[] memory) {
    return(modules[_type]);
  }
  function getModuleDataByIndex(bytes8 _type, uint256 _index) external view returns(Data.Module memory) {
    return(modules[_type][_index]);
  }

  function getDaoSettings() public view returns(Data.DaoSettings memory) {
    Data.DaoSettings memory daoSettings;
    daoSettings.name = name;
    daoSettings.description = description;
    daoSettings.visibility = visibility;
    return daoSettings;
  }
}