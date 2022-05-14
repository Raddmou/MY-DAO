// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// import './interfaces/IDaosFactory.sol';
import './DaoBase.sol';

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

  // function activateModule(address _daoAdress, string memory _moduleType, string memory code) public {
  //   require(availableModules[code].isActive == true, "Module not found");
  //   modulesDaos[_daoAdress][_moduleType].code = code;
  //   modulesDaos[_daoAdress][_moduleType].isActive = true;
  //   IModule module = new IModule();
  // }

  //  function getDaosAddressByMember(address _addressMember) external view returns (address[] memory) {
  //   return (membershipDaos[_addressMember]);
  // }

  function createDAO(string calldata _name, string calldata _description, Data.visibilityEnum _visibility) public {
    DaoBase dao = new DaoBase(_name, _description, _visibility);
    dao.authorizeContract(address(this));
    // MembershipDao memberModule = new MembershipDao(membershipMode);
    // dao.addModule(dao.hash("MemberModule"), address(memberModule));
    deployedDao memory _dao;
    _dao.owner = msg.sender;
    _dao.daoAddress = address(dao);
    daos.push(_dao); 
    dao.transferOwnership(msg.sender);
    emit DaoCreated(msg.sender, _name, _dao.daoAddress);
  }
}