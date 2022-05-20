// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.9;

// contract Ownable {
//   mapping(address => bool) private _owners;
//   mapping(uint256 => address) private _getAddress;
//   mapping(address => uint256) private _getId;
//   uint256 private _counter = 0;

//   event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
//   event OwnerAdded(address ownerAdded);

//   constructor() {
//     _owner[msg.sender] = true;
//     _getAddress[_counter] = msg.sender;
//     _getId[msg.sender] = _counter;
//     ++_counter;
//   }

//   modifier onlyOwners() {
//     require(_owners[msg.sender], "Ownable: caller is not the owner");
//     _;
//   }

//   function owners() public view virtual returns (address[]) {
//     address[] memory owners = new address[](_counter);
//     for(uint256 i = 0; i < _counter; ++i) {
//       owners[i] = _getAddress[i];
//     }
//     return owners;
//   }

//   function addOwner(address _owner) public virtual onlyOwners {
//     require(_owner != address(0), "Ownable: new owner is the zero address");
//     _owners[_owner] = true;
//     _getAddress[_counter] = _owner;
//     _getId[_owner] = _counter;
//     ++_counter;
//     emit OwnerAdded(_owner);
//   }

//   function renounceOwnership() public virtual onlyOwners {
//     transferOwnership(address(0));
//   }

//   function transferOwnership(address newOwner) public virtual onlyOwners {
//     uint256 id = _getId[msg.sender];
//     _getId[newOwner] = id;
//     _getAddress[id] = newOwner;
//     _owners[newOwner] = true;
//     emit OwnershipTransferred(msg.sender, newOwner);
//   }
// }