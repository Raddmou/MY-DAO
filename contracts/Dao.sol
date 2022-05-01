// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

//is DaosFactory
contract Dao is Ownable {
  using SafeMath for uint256;
  
    constructor (string memory _name, bool byInvitation)
    {
      name = _name;
      if(byInvitation)
          membershipModeMode = membershipModeEnum.invite;
      else
          membershipModeMode = membershipModeEnum.open;
    }

  uint256[] public modules;
  string public name;
  uint256 public id;
  mapping(address => member) public members;
  membershipModeEnum public membershipModeMode;
  visibilityEnum public visibility;
  mapping(address => bool) private authorizedContracts;
  //member[] public members;

  event MemberAdded(address newMember);
  event MemberInvited(address memberInvitor, address memberInvited);
  event MemberJoined(address memberJoined);

  struct member {
        memberStatus status;
        //address memberAddress;
    }

  enum visibilityEnum {
        privateDao,
        publicDao
    }

  enum memberStatus {
        notMember,
        invited,
        asking,
        active
    }

    enum membershipModeEnum {
        invite,
        request,
        open
    }

    modifier onlyActiveMembersOrAuthorizeContracts() {
        require(members[msg.sender].status == memberStatus.active || authorizedContracts[msg.sender] == true, "Not authorized");
        _;
    }

    modifier onlyNotActiveMembers() {
        require(members[msg.sender].status != memberStatus.active, "Not authorized");
        _;
    }

    modifier onlyAuthorizeContracts() {
        require(authorizedContracts[msg.sender] == true, "Not authorized");
        _;
    }

    modifier onlyAuthorizeContractsOrOwner() {
        require(((authorizedContracts[msg.sender] == true) || msg.sender == owner()), "Not authorized");
        _;
    }

    function setMode(membershipModeEnum _mode) public onlyOwner() {
       membershipModeMode = _mode;
    }

    function setName(string calldata _name) public onlyOwner() {
       name = _name;
    }

    function addMember(address addressMember) public onlyActiveMembersOrAuthorizeContracts() {
        members[addressMember].status = memberStatus.active;
        emit MemberAdded(addressMember);
    }

    function inviteMember(address addressMember) public onlyActiveMembersOrAuthorizeContracts() {
        members[addressMember].status = memberStatus.invited;
        emit MemberInvited(msg.sender, addressMember);
    }

    function isActiveMember(address addressMember) public view returns (bool){
        return members[addressMember].status == memberStatus.active;
    }

    function join() public onlyNotActiveMembers() {
        require((members[msg.sender].status == memberStatus.invited && membershipModeMode == membershipModeEnum.invite)
         || (members[msg.sender].status == memberStatus.notMember && membershipModeMode == membershipModeEnum.open)
                , "Impossible to join");
        members[msg.sender].status = memberStatus.active;
        emit MemberJoined(msg.sender);
    }

    function authorizeContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
        authorizedContracts[_contractAddress] = true;
    }

    function denyContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
        authorizedContracts[_contractAddress] = false;
    }
  

    // function addMember(address addressMember) public {
    //     member memory _member;
    //     _member.status = memberStatus.member;
    //     _member.memberAddress = addressMember;
    //    members.push(_member);
    // }

    // function inviteMember(address addressMember) public {
    //     member memory _member;
    //     _member.status = memberStatus.invited;
    //     _member.memberAddress = addressMember;
    //    members.push(_member);
    // }
  
}