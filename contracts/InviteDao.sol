// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract InviteDao {
  address[] owners;
  mapping(address => member) users;

  struct member {
    address user;
    bool status; // active or not
  }

  event SetMember(member user);

  constructor(address _owner) {
    member memory _user;
    owners.push(_owner);
    _user.user = _owner;
    _user.status = true;
    users[_owner] = _user;
  }

  modifier onlyOwners() {
    bool success = false;
    for (uint256 i = 0; i < owners.length; i++) {
      if(msg.sender == owners[i])
        success = true;
    }
    require(success, "Failed u are not the owner");
    _;
  }

  function joinDao() public {
    
  }

  function inviteMember(address _member) public onlyOwners() {
    member memory _user;
    _user.user = _member;
    _user.status = false;
    users[_member] = _user;
  }
}