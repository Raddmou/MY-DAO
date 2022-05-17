// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../Data.sol";

interface IMembersDao {
  function getAddrById(uint256 id) external view returns(address);
  // function getMembers() external view returns(address);
  function getMembersCount() external view returns(uint256);
  function getMemberInfo(address dao, address member) external view returns(Data.member[] memory);
  function isActiveMember(address dao, address member) external view returns(bool);
}