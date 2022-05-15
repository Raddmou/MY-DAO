// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../Data.sol";

interface IModule {
  function getCode() external view returns(string memory);

  function addDao(address _contractDao) external;
}