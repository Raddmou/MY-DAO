// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Data.sol";

/**
* @title DaoBase
* @author chixx.eth & Mourad M.
* @notice DaoBase represents a DAO, deployed by DaosFactory to create a new dao. DaoBase store general infos and all the
* modules references for the dao
*/
contract DaoBase is Ownable {
  /**
  * @notice name of the dao
  */
  string public name;

  /**
  * @notice description of the dao
  */
  string public description;

  /*
  * @notice rules of the dao
  */
  string public rules;

  /** 
  * @notice indicates if dao is visible by not members
  */
  Data.visibilityEnum public visibility;

  /**
  * @notice counter of modules of the dao
  */
  uint256 public modulesTypeCount;

  /**
  * @notice store address that can interact with only owner functions. mapping of user or contract address and an boolean indicating if if is authorized
  */
  mapping(address => bool) private authorizedContracts;

  /**
  * @dev moduleType: mapping of module identifier and hashed type module
  * @notice store module types by module identifier
  */
  mapping(uint256 => bytes8) public moduleType;

  /**
  * @dev mapping of modules array by hashed type module
  * @notice store module informations
  */
  mapping(bytes8 => Data.Module[]) public modules;

  event DaoCreated(address daoAddress, address creatorAddress);
  event ModuleAdded(string moduleCode, address moduleAddress, address adderAddress);

  /**
  * @notice check if msg.sender is autorized
  */
  modifier onlyAuthorizeContracts() {
    require(authorizedContracts[msg.sender] == true, "Not authorized");
    _;
  }

  /**
  * @notice check if msg.sender is autorized
  */
  modifier onlyAuthorizeContractsOrOwner() {
    require(((authorizedContracts[msg.sender] == true) || msg.sender == owner()), "Not authorized");
    _;
  }

   /**
  * @notice contract creation actions/settings
  * @param _name name of the Dao
  * @param _description description of the Dao
  * @param _visibility visibility of the dao see ./Data.sol
  * @param _rules rules of the Dao
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

  /**
  * @notice add new module to the Dao
  * @param _type type hash of the module
  * @param _code code hash of the module
  * @param _moduleAddr address of the module
  * @param _isExclusive if the type module can have multiple module
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

  /**
  * @notice authorized a new address
  * @param _contractAddress address to authorized
  */
  function authorizeContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
    authorizedContracts[_contractAddress] = true;
  }

  /**
  * @notice deny an authorized address 
  * @param _contractAddress address to deny authorization
  */
  function denyContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
    authorizedContracts[_contractAddress] = false;
  }

  /**
  * @notice get array of all module from a certain type
  * @param _type type hash of the module
  * @return array of module, module type & code hash see >/Data.sol
  */
  function getModuleData(bytes8 _type) public view returns(Data.Module[] memory) {
    return(modules[_type]);
  }

  /**
  * @notice get module info from a certain type from a specific index
  * @param _type type hash of the module
  * @param _index index of the module
  * @return module type & code hash
  */
  function getModuleDataByIndex(bytes8 _type, uint256 _index) external view returns(Data.Module memory) {
    return(modules[_type][_index]);
  }

  /**
  * @notice get Dao informations
  * @return DaoSettings informations of the dao
  */
  function getDaoSettings() public view returns(Data.DaoSettings memory) {
    Data.DaoSettings memory daoSettings;
    daoSettings.name = name;
    daoSettings.description = description;
    daoSettings.visibility = visibility;
    return daoSettings;
  }
}