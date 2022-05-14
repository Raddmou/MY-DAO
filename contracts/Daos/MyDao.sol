// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Dao.sol";
import "../Data.sol";
import "./Interfaces/IDao.sol";

contract MyDao {
  string public name;
  string public description;
  
  // mapping(uint256 => address) modules;
  address[] public modules;

  // enum MyModules {
  //   DaoMemberSystem,
  //   DaoVotingSystem
  // }

  constructor(string memory _name, string memory _description, address[] memory _modules) {
    name = _name;
    description = _description;
    // Dao dao = new Dao(_name, byInvitation, _description, isPrivate);
    modules = _modules;
  }
  // get info
  function memberInfo(address _member) external view returns(Data.member memory) {
    return(IDao(modules[0]).getMemberInfo(_member));
  }
  function addrId(uint256 _id) external view returns(address) {
    return(IDao(modules[0]).getAddrById(_id));
  }
  function totalId() external view returns(uint256) {
    return(IDao(modules[0]).getTotalId());
  }
  function daoInfo() external view returns(Data.daoData memory) {
    return(IDao(modules[0]).getInfoDao());
  }
  // add new modules
  function addModule(address _newModule) external {
    modules.push(_newModule);
  }
}