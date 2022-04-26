// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

interface IDaosFactory {
    
    event DaoCreated(address indexed _address);
    function getDao(address tokenA, address tokenB) external view returns (address pair);
    function getDaos(uint) external view returns (address pair);
    function createDao(address _address, address tokenB) external returns (address pair);
}