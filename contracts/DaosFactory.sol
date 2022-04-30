// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

import './interfaces/IDaosFactory.sol';
import './Dao.sol';

//is DaosFactory
contract DaosFactory is Ownable {
  using SafeMath for uint256;
  uint256 private daoId;

  //user > daos
  mapping(address => address[]) membershipDaos;

  deployedDao[] public daos;

  struct deployedDao {
    address owner;
    address daoAddress;
  }

//   event DaoCreated(address user, string name, address daoAddr, uint256[] modules, uint256 id);
  event DaoCreated(address user, string name, address daoAddress);

  function getdeployedDaos() external view returns (deployedDao[] memory) {
    return daos;
  }

   function getDaosAddressByMember(address _addressMember) external view returns (address[] memory) {
    return (membershipDaos[_addressMember]);
  }

  // function getMyDaosIds() external view returns (uint256[] memory) {
  //   return (myDaos[msg.sender]);
  // }
  // function getDaoInfoId(uint256 _id) external view returns (deployedDaos memory) {
  //   return (daos[_id]);
  // }
  
  // after create the DAO we need to change the owner because now this contract is the owner
  //, uint256[] calldata _modules
  function createDAO(string calldata _name, bool _byInvitation) public {
    Dao dao = new Dao(_byInvitation);
    dao.setName(_name);
    dao.addMember(msg.sender);
    deployedDao memory _dao;
    _dao.owner = msg.sender;
    _dao.daoAddress = address(dao);
    daos.push(_dao);
    membershipDaos[msg.sender].push(_dao.daoAddress);
    dao.transferOwnership(msg.sender);
    // deployedDaos memory _dao;
    // _dao.name = _name;
    // _dao.owner = msg.sender;
    // //Dao dao = new Dao();
    // //address contractAddress = new Dao();
    // _dao.daoAddr =  address(0); //dao.address;
    // //_dao.modules = _modules;
    // _dao.id = daoId;
    // _dao.members.push(msg.sender);
    // daos.push(_dao);
    // daoId = daoId.add(1);
    // // emit DaoCreated(msg.sender, _name, _dao.daoAddr, _modules, _dao.id);
    emit DaoCreated(msg.sender, _name, _dao.daoAddress);
  }
}