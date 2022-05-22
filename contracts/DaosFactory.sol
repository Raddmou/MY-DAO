// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import './Modules/interfaces/IModule.sol';
import './DaoBase.sol';
import './Data.sol';

/**
* @title DaosFactory
* @author chixx.eth & mourad
* @notice Smart contract for MY-DAO create/save daos, add/activate modules
*/
contract DaosFactory is Ownable {
  using SafeMath for uint256;

  /// @notice counter of how many dao are created by DaosFactory
  uint256 private daoId;

  /// @notice store daos create by DaosFactory
  deployedDao[] public daos;

  /**
  * @notice store daos owners
  * @return bool true or false if user is owner
  */
  mapping(address => mapping(address => bool)) public daoOwners;

  /// @notice store all modules
  mapping(bytes8 => mapping(bytes8 => Data.Module)) public modulesDaos;

  /// @notice check if msg.sender is the owner of the dao
  struct deployedDao {
    address owner;
    address daoAddress;
  }

  event DaoCreated(address user, string name, address daoAddress);
  event ModuleActivated(address user, string name, address daoAddress);

  /// @notice check if msg.sender is the owner of the dao
  modifier onlyDaoOwners(address _daoAddress) {
    require(daoOwners[_daoAddress][msg.sender], "Invalid User: DaosFactory");
    _;
  }

  /**
  * @notice get all daos deployed by MY-DAO
  * @return deployedDao array of all deployedDao see struct deployedDao
  */
  function getdeployedDaos() external view returns (deployedDao[] memory) {
    return daos;
  }

  /**
  * @notice activeate a new module for the Dao Owner
  * @param _daoAddress: the dao address who activate the module
  * @param _type: the type hash of the module see ./Data.sol
  * @param _code: the code hash of the module see ./Data.sol
  * @return address of the module deployed
  */
  function activateModuleForDao(address _daoAddress, bytes8 _type, bytes8 _code) external onlyDaoOwners(_daoAddress) returns(address) {
    require(modulesDaos[_type][_code].isActive == true, "Module not found");
    return (_activateModuleForDao(_daoAddress, _type, _code));
  }

  /**
  * @notice activeate a new module logic
  * @param _daoAddress: the dao address who activate the module
  * @param _type: the type hash of the module see ./Data.sol
  * @param _code: the code hash of the module see ./Data.sol
  * @return address of the module deployed
  */
  function _activateModuleForDao(address _daoAddress, bytes8 _type, bytes8 _code)
    internal
    returns(address)
  {
    require(modulesDaos[_type][_code].isActive == true, "Module not found");
    IModule(modulesDaos[_type][_code].moduleAddress).addDao(_daoAddress, msg.sender);
    DaoBase(_daoAddress).addModule(_type, _code, modulesDaos[_type][_code].moduleAddress,
      modulesDaos[_type][_code].isExclusive);
    return modulesDaos[_type][_code].moduleAddress;  
  }

  /**
  * @notice add a new module, MY-DAO owner only
  * @param _moduleAddress: the dao address to add
  * @param _type: the type hash of the module see ./Data.sol
  * @param _code: the code hash of the module see ./Data.sol
  * @param _isExclusive: if the type module can have multiple modules
  */
  function addModule(address _moduleAddress, bytes8 _type, bytes8 _code, bool _isExclusive)
    public
    onlyOwner
  {
    Data.Module memory module;
    module.isActive = true;
    module.isExclusive = _isExclusive;
    module.moduleType = _type;
    module.moduleCode = _code;
    module.moduleAddress = _moduleAddress;
    modulesDaos[_type][_code] = module;
  }

  /**
  * @notice create a new dao and store in DaosFactory
  * @param _name: the dao name
  * @param _description: the dao description
  * @param _visibility: the visibility see ./Data.sol
  * @param _rules: the dao rules
  * @param _modules: array of modules type and code hash to add 
  */
  function createDAO(
    string calldata _name,
    string calldata _description,
    Data.visibilityEnum _visibility,
    string memory _rules,
    Data.ModuleToActivate[] memory _modules
  )
    public
  {
    require(_modules.length < 10, "Modules must be less than 10.");
    require(bytes(_name).length != 0, "Name can not be empty");    
    deployedDao memory _dao;
    DaoBase dao = new DaoBase(_name, _description, _visibility, _rules);
    dao.authorizeContract(address(this));
    dao.transferOwnership(msg.sender);
    _dao.owner = msg.sender;
    _dao.daoAddress = address(dao);
    daos.push(_dao);

    for(uint i=0; i < _modules.length; ++i) {
      require(modulesDaos[_modules[i].moduleType][_modules[i].moduleCode].isActive == true, "Module not found");
      _activateModuleForDao(
        address(dao),
        _modules[i].moduleType,
        _modules[i].moduleCode
      );
    }
    daoOwners[address(dao)][msg.sender] = true;
    emit DaoCreated(msg.sender, _name, _dao.daoAddress);
  }

  /**
  * @notice create a bytes8 hash
  * @param _name: string to hash
  * @return bytes8 hash
  */
  function hash(string memory _name) external pure returns(bytes8) {
    return (bytes8(keccak256(abi.encode(_name))));
  }
}