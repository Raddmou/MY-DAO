// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../Data.sol";

interface IMembersDao {
  function getMembers() external view returns(address);
  function getMemberInfo(address member) external view returns(Data.member[] memory);
  function isActiveMember(address member) external view returns(bool);
}