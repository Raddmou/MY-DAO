// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../Data.sol";

interface IDao {
  function getAddrById(uint256 id) external view returns(address);
  function getMemberInfo(address member) external view returns(Data.member memory);
  function getTotalId() external view returns(uint256);
  function getInfoDao() external view returns(Data.daoData memory);
}