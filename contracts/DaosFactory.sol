// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

import './interfaces/IDaosFactory.sol';
import './Daos/Dao.sol';
import "./Daos/Interfaces/IModule.sol";

//is DaosFactory
contract DaosFactory is Ownable {
  using SafeMath for uint256;
  uint256 private daoId;

  // //user > daos
  // mapping(address => address[]) public membershipDaos;
  deployedDao[] public daos;
  //MyModule[] public availableModules;
  mapping(string => MyModule) public availableModules;
  // mapping(address => ModuleDao[]) public modulesDaos;
  //dao address => moduleType => module
  mapping(address => mapping(string => ModuleDao)) modulesDaos;

  struct deployedDao {
    address owner;
    address daoAddress;
  }

  struct MyModule {
    string moduleType;
    string smartContractName;
    string code;
    bool isActive;
  }

  struct ModuleDao {
    uint256 id;
    address moduleAddress;
    // IModule module;
    bool isActive;
    string moduleType;
    string code;
    string abiCode;
  }

  event DaoCreated(address user, string name, address daoAddress);

  function getdeployedDaos() external view returns (deployedDao[] memory) {
    return daos;
  }

  function activateModule(address _daoAdress, string memory _moduleType, string memory code) public {
    require(availableModules[code].isActive == true, "Module not found");
    modulesDaos[_daoAdress][_moduleType].code = code;
    modulesDaos[_daoAdress][_moduleType].isActive = true;
    IModule module = new IModule();
  }

  //  function getDaosAddressByMember(address _addressMember) external view returns (address[] memory) {
  //   return (membershipDaos[_addressMember]);
  // }

  function createDAO(string calldata _name, uint8 membershipMode, string calldata _description, bool isPrivate) public {
    Dao dao = new Dao(_name, membershipMode, _description, isPrivate);
    dao.authorizeContract(address(this));
    dao.addMember(msg.sender);
    deployedDao memory _dao;
    _dao.owner = msg.sender;
    _dao.daoAddress = address(dao);
    daos.push(_dao);
    //membershipDaos[msg.sender].push(_dao.daoAddress);  
    dao.transferOwnership(msg.sender);
    emit DaoCreated(msg.sender, _name, _dao.daoAddress);
  }
}