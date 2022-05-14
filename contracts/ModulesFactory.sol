// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.9;

// import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
// import "./Daos/Interfaces/IModule.sol";
// import "./Data.sol";


// //is DaosFactory
// contract ModulesFactory is Ownable {
//   using SafeMath for uint256;
//   MyModule[] public modules;

//   struct MyModule {
//     string moduleType;
//     string smartContractName;
//   }

//   function activateModule(address _daoAdress, ModuleType _moduleType, string memory code) public {
//     if(_moduleType == ModuleType)
    
//     IModule dao = new Dao(_name, membershipMode, _description, isPrivate);
//     dao.authorizeContract(address(this));
//     dao.addMember(msg.sender);
//     deployedDao memory _dao;
//     _dao.owner = msg.sender;
//     _dao.daoAddress = address(dao);
//     daos.push(_dao);
//     membershipDaos[msg.sender].push(_dao.daoAddress);  
//     dao.transferOwnership(msg.sender);
//     emit DaoCreated(msg.sender, _name, _dao.daoAddress);
//   }
// }