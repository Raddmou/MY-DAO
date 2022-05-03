// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IDaosFactory {
    
    event DaoCreated(address indexed _address);
    function getDao(address _address) external view returns (address pair);
    function getDaos(uint) external view returns (address pair);
    function createDao(address _address) external returns (address pair);
}