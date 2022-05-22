// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../Data.sol";

/**
* @title IModule
* @author chixx.eth & mourad
* @notice Interface for module
*/
interface IModule {

  function getCode() external view returns(string memory);

  /**
  * @notice link a dao to SimpleDonationsModule
  * @param dao address of the dao
  * @param member address of the user of the dao in this case the owner of the dao
  */
  function addDao(address dao, address member) external;
}