// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// invite DAO simple methods with mapping for identifier

contract InviteDao {
  address[] public owners;
  bool public visibility;
  bool public firedOption;
  uint256 id = 0;

  mapping(uint256 => address) addrById;
  mapping(address => member) users;

  struct member {
    address user;
    uint256 id;
    uint256 joinTime;
    memberStatus status;
  }
  enum memberStatus {
    notMember,
    invited,
    asking,
    active
  }

  event SetMember(member user);
  event MemberJoined(address memberJoined, uint256 time);
  event MemberInvites(address memberInvited, address inviter);
  event MemberFired(address memberFired, address firerer);
  event MemberAsked(address memberAsked);

  constructor(address _owner, bool _visibility, bool _firedOption) {
    member memory _user;
    visibility = _visibility;
    firedOption = _firedOption;
    owners.push(msg.sender);
    owners.push(_owner);
    _user.user = _owner;
    _user.joinTime = block.timestamp;
    _user.status = memberStatus.active;
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
    member memory user;
    require(users[msg.sender].status == memberStatus.invited);
    user.id = id;
    user.joinTime = block.timestamp;
    user.status = memberStatus.active;
    users[msg.sender] = user;
    ++id;
    emit MemberJoined(msg.sender, block.timestamp);
  }

  function askToJoin() external {
    member memory user;
    user.id = id;
    user.user = msg.sender;
    user.status = memberStatus.asking;
    id++;
    emit MemberAsked(msg.sender);
  }
  function validAsk(address _user) external onlyOwners() {
    member memory user = users[_user];
    user.joinTime = block.timestamp;
    user.status = memberStatus.active;
    users[_user] = user;
    emit MemberJoined(_user, block.timestamp);
  }

  function inviteMember(address _member) public onlyOwners() {
    member memory user;
    user.user = _member;
    user.status = memberStatus.invited;
    users[_member] = user;
    emit MemberInvites(_member, msg.sender);
  }
  function fireMember(address _member) public onlyOwners() {
    require(firedOption == true, "Ivalid Option");
    users[_member].status = memberStatus.notMember;
    emit MemberFired(_member, msg.sender);
  }
}