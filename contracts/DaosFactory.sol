// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

import './interfaces/IDaosFactory.sol';
import './Daos/Dao.sol';

//is DaosFactory
contract DaosFactory is Ownable {
  using SafeMath for uint256;
  uint256 private daoId;

  //user > daos
  mapping(address => address[]) public membershipDaos;

  deployedDao[] public daos;

  struct deployedDao {
    address owner;
    address daoAddress;
  }

  event DaoCreated(address user, string name, address daoAddress);

  function getdeployedDaos() external view returns (deployedDao[] memory) {
    return daos;
  }

   function getDaosAddressByMember(address _addressMember) external view returns (address[] memory) {
    return (membershipDaos[_addressMember]);
  }

  function createDAO(string calldata _name, bool _byInvitation, string calldata _description, bool isPrivate) public {
    Dao dao = new Dao(_name, _byInvitation, _description, isPrivate);
    dao.authorizeContract(address(this));
    dao.addMember(msg.sender);
    deployedDao memory _dao;
    _dao.owner = msg.sender;
    _dao.daoAddress = address(dao);
    daos.push(_dao);
    membershipDaos[msg.sender].push(_dao.daoAddress);  
    dao.transferOwnership(msg.sender);
    emit DaoCreated(msg.sender, _name, _dao.daoAddress);
  }
}