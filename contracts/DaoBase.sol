// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Data.sol";

/*
* @title DaoBase
* @author chixx.eth & Mourad M.
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

  /*
  * @title onlyAuthorizeContracts
  * @notice check if msg.sender is autorized
  */
  modifier onlyAuthorizeContracts() {
    require(authorizedContracts[msg.sender] == true, "Not authorized");
    _;
  }

  /*
  * @title onlyAuthorizeContractsOrOwner
  * @notice check if msg.sender is autorized
  */
  modifier onlyAuthorizeContractsOrOwner() {
    require(((authorizedContracts[msg.sender] == true) || msg.sender == owner()), "Not authorized");
    _;
  }

   /*
  * @title constructor
  * @notice contract creation actions/settings
  * @param _name: name of the Dao
  * @param _description: description of the Dao
  * @param _visibility: visibility of the dao see ./Data.sol
  * @param _rules: rules of the Dao
  */
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

  /*
  * @title addModule
  * @notice add new module to the Dao
  * @param _type: type hash of the module
  * @param _code: code hash of the module
  * @param _moduleAddr: address of the module
  * @param _isExclusive: if the type module can have multiple module
  */
  function addModule(bytes8 _type, bytes8 _code, address _moduleAddr, bool _isExclusive)
    public
    onlyAuthorizeContractsOrOwner()
  {
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

  /*
  * @title authorizeContract only authorized
  * @notice authorized a new address
  * @param _contractAddress: address to authorized
  * return array of module, module type & code hash see >/Data.sol
  */
  function authorizeContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
    authorizedContracts[_contractAddress] = true;
  }

  /*
  * @title denyContract only authorized
  * @notice deny address authorized
  * @param _contractAddress: address to deny authorization
  */
  function denyContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
    authorizedContracts[_contractAddress] = false;
  }

  /*
  * @title getModuleData
  * @notice get array of all module from a certain type
  * @param _type: type hash of the module
  * return array of module, module type & code hash see >/Data.sol
  */
  function getModuleData(bytes8 _type) public view returns(Data.Module[] memory) {
    return(modules[_type]);
  }

  /*
  * @title getModuleDataByIndex
  * @notice get module info from a certain type from a specific index
  * @param _type: type hash of the module
  * @param _index: index of the module
  * return module type & code hash see >/Data.sol
  */
  function getModuleDataByIndex(bytes8 _type, uint256 _index) external view returns(Data.Module memory) {
    return(modules[_type][_index]);
  }

  /*
  * @title getDaoSettings
  * @notice get Dao info
  * return info of the dao see ./Data.sol
  */
  function getDaoSettings() public view returns(Data.DaoSettings memory) {
    Data.DaoSettings memory daoSettings;
    daoSettings.name = name;
    daoSettings.description = description;
    daoSettings.visibility = visibility;
    return daoSettings;
  }
}