// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import './Modules/interfaces/IModule.sol';
import './DaoBase.sol';
import './Data.sol';

//is DaosFactory
contract DaosFactory is Ownable {
  using SafeMath for uint256;
  uint256 private daoId;

  // //user > daos
  // mapping(address => address[]) public membershipDaos;
  deployedDao[] public daos;
  mapping(address => mapping(address => bool)) public daoOwners;
  //MyModule[] public availableModules;
  //mapping(string => MyModule) public availableModules;
  // mapping(address => ModuleDao[]) public modulesDaos;
  //dao address => moduleType => module
  mapping(bytes8 => mapping(bytes8 => Data.Module)) public modulesDaos;

  struct deployedDao {
    address owner;
    address daoAddress;
  }

  // struct MyModule {
  //   string moduleType;
  //   string smartContractName;
  //   string code;
  //   bool isActive;
  // }

  // struct ModuleDao {
  //   uint256 id;
  //   address moduleAddress;
  //   // IModule module;
  //   bool isActive;
  //   string moduleType;
  //   string code;
  //   //string abiCode;
  // }

  event DaoCreated(address user, string name, address daoAddress);
  event ModuleActivated(address user, string name, address daoAddress);

  modifier onlyDaoOwners(address _daoAddress) {
    require(daoOwners[_daoAddress][msg.sender], "Invalid User");
    _;
  }

  function getdeployedDaos() external view returns (deployedDao[] memory) {
    return daos;
  }

  function activateModuleForDao(address _daoAddress, bytes8 _type, bytes8 _code) public onlyDaoOwners(_daoAddress) returns(address) {
    require(modulesDaos[_type][_code].isActive == true, "Module not found");
    IModule(modulesDaos[_type][_code].moduleAddress).addDao(_daoAddress, msg.sender);
    DaoBase(_daoAddress).addModule(_type, modulesDaos[_type][_code].moduleAddress);
    return modulesDaos[_type][_code].moduleAddress;  
  }
  function _activateModuleForDao(address _daoAddress, bytes8 _type, bytes8 _code) internal returns(address) {
    require(modulesDaos[_type][_code].isActive == true, "Module not found");
    IModule(modulesDaos[_type][_code].moduleAddress).addDao(_daoAddress, msg.sender);
    DaoBase(_daoAddress).addModule(_type, modulesDaos[_type][_code].moduleAddress);
    return modulesDaos[_type][_code].moduleAddress;  
  }

  function addModule(address _moduleAddress, bytes8 _type, bytes8 _code) public onlyOwner {
    modulesDaos[_type][_code].isActive = true;
    modulesDaos[_type][_code].moduleType = _type;
    modulesDaos[_type][_code].moduleCode = _code;
    modulesDaos[_type][_code].moduleAddress = _moduleAddress;
  }

  //  function getDaosAddressByMember(address _addressMember) external view returns (address[] memory) {
  //   return (membershipDaos[_addressMember]);
  // }

  function createDAO(string calldata _name, string calldata _description, Data.visibilityEnum _visibility
                    , Data.ModuleToActivate[] memory _modules) public {
    require(_modules.length < 10, "Modules must be less than 10.");
    DaoBase dao = new DaoBase(_name, _description, _visibility);
    // MembershipDao memberModule = new MembershipDao(membershipMode);
    // dao.addModule(dao.hash("MemberModule"), address(memberModule));
    deployedDao memory _dao;
    _dao.owner = msg.sender;
    _dao.daoAddress = address(dao);
    daos.push(_dao); 
    dao.authorizeContract(address(this));
    dao.transferOwnership(msg.sender);

    for(uint i=0; i<_modules.length; ++i){
      require(modulesDaos[_modules[i].moduleType][_modules[i].moduleCode].isActive == true, "Module not found");
        _activateModuleForDao(address(dao)
        , _modules[i].moduleType
        , _modules[i].moduleCode);
     }
    daoOwners[address(dao)][msg.sender] = true;
    emit DaoCreated(msg.sender, _name, _dao.daoAddress);
  }

  function hash(string memory _name) public pure returns(bytes8) {
    return (bytes8(keccak256(abi.encode(_name))));
  }
}