// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IDao {
    event membershipAdded(address _owner);
    function name() external view returns (string memory);
    function isMember() external view returns (bool);

}