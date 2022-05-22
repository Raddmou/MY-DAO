// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../Data.sol";

/**
* @title IMembersDao
* @author chixx.eth & mourad
* @notice Interface for membership module
*/
interface IMembersDao {
  /**
  * @notice get address of a member in a dao by his id
  * @param dao address of the dao
  * @param id id of the member
  * @return member address of the member
  */
  function getAddrById(address dao, uint256 id) external view returns(address);

  /**
  * @notice get the total member of the dao
  * @param dao address of the dao
  * @return count uint256 of the total member in the dao
  */
  function getMembersCount(address dao) external view returns(uint256);

  /**
  * @notice get info of a member in a dao
  * @param dao address of the dao
  * @param member address of the member
  * @return memberInfo struct that store info of the member see Data.sol
  */
  function getMemberInfo(address dao, address member) external view returns(Data.member[] memory);

  /**
  * @notice return if a address is member of a dao
  * @param dao address of the dao
  * @param member address of the user to check
  * @return bool true or false if is active
  */
  function isActiveMember(address dao, address member) external view returns(bool);
}