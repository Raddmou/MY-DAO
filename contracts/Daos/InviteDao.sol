// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// invite DAO simple methods with mapping for identifier

contract InviteDao {
  address[] public owners;
  bool public visibility;

  mapping(address => member) users;

  struct member {
    address user;
    uint256 joinTime;
    bool status; // active or not
  }

  event SetMember(member user);
  event MemberJoined(address memberJoined, uint256 time);
  event MemberInvites(address memberInvited, address inviter);
  event MemberFired(address memberFired, address firerer);

  constructor(address _owner, bool _visibility) {
    member memory _user;
    visibility = _visibility;
    owners.push(msg.sender);
    owners.push(_owner);
    _user.user = _owner;
    _user.joinTime = block.timestamp;
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
  //set functions
  function setVisibility(bool _newVisibility) external onlyOwners() {
    visibility = _newVisibility;
  }

  function joinDao() public {
    member memory _user;
    require(users[msg.sender].status == false && users[msg.sender].user == msg.sender);
    _user.joinTime = block.timestamp;
    _user.status = true;
    users[msg.sender] = _user;
    emit MemberJoined(msg.sender, block.timestamp);
  }

  function inviteMember(address _member) public onlyOwners() {
    member memory _user;
    _user.user = _member;
    _user.status = false;
    users[_member] = _user;
    emit MemberInvites(_member, msg.sender);
  }
  function fireMember(address _member) public onlyOwners() {
    users[_member].status = false;
    emit MemberFired(_member, msg.sender);
  }
}