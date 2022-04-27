// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

import './interfaces/IDaosFactory.sol';

//is DaosFactory
contract DaosFactory is Ownable {
  using SafeMath for uint256;
  uint256 private daoId;

  mapping(address => uint256[]) myDaos;

  deployedDaos[] public daos;

  struct deployedDaos {
    string name;
    address owner;
    address daoAddr;
    uint256[] modules;
    uint256 id;
  }

  event CreateDAO(address user, string name, address daoAddr, uint256[] modules);

  function getMyDaosIds() external view returns (uint256[] memory) {
    return (myDaos[msg.sender]);
  }
  function getDaoInfoId(uint256 _id) external view returns (deployedDaos memory) {
    return (daos[_id]);
  }
  // after create the DAO we need to change the owner because now this contract is the owner
  function createDAO(string calldata _name, uint256[] calldata _modules) public {
    deployedDaos memory _dao;
    _dao.name = _name;
    _dao.owner = msg.sender;
    _dao.daoAddr = address(0); //new DAO();
    _dao.modules = _modules;
    _dao.id = daoId;
    daos.push(_dao);
    daoId = daoId.add(1);
    emit CreateDAO(msg.sender, _name, _dao.daoAddr, _modules);
  }
}