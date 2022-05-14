// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../Data.sol";

//is DaosFactory
contract MembershipDao is Ownable {
  using SafeMath for uint256;
  string public code;
  uint256 public membersCount;
  mapping(uint256 => address) public memberAddresses;
  mapping(address => Data.member) public members;
  Data.membershipModeEnum public membershipModeMode;
  Data.visibilityEnum public visibility;
  mapping(address => bool) private authorizedContracts;
  //member[] public members;

  constructor (uint8 membershipMode)
  {
    membershipModeMode = Data.membershipModeEnum(membershipMode);
  }

  event MemberAdded(address newMember, address adderAddress);
  event MemberAccepted(address newMember, address acceptorAddress);
  event MemberInvited(address memberInvited, address memberInvitor);
  event MemberJoined(address memberJoined);
  event MemberAskedJoin(address memberRequestor);

    modifier onlyActiveMembersOrAuthorizeContracts() {
        require(members[msg.sender].status == Data.memberStatus.active || authorizedContracts[msg.sender] == true, "Not authorized");
        _;
    }

    modifier onlyNotActiveMembers() {
        require(members[msg.sender].status != Data.memberStatus.active, "Not authorized");
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

    function getMemberInfo(address _member) external view returns(Data.member memory) {
        return(members[_member]);
    }

    // function getInfoDao() external view returns(Data.daoData memory info) {
    //     info.daoType = "DAO, Invite or Request";
    //     info.visibility = visibility;
    // }

    function addMember(address addressMember) public onlyActiveMembersOrAuthorizeContracts() {
        members[addressMember].status = Data.memberStatus.active;
        memberAddresses[membersCount] = addressMember;
        ++membersCount;
        emit MemberAdded(addressMember, msg.sender);
    }

    function acceptMember(address addressMember) public onlyActiveMembersOrAuthorizeContracts() {
        members[addressMember].status = Data.memberStatus.active;
        emit MemberAccepted(addressMember, msg.sender);
    }

    function inviteMember(address addressMember) public onlyActiveMembersOrAuthorizeContracts() {
        members[addressMember].status = Data.memberStatus.invited;
        memberAddresses[membersCount] = addressMember;
        ++membersCount;
        emit MemberInvited(msg.sender, addressMember);
    }

    function requestJoin() public onlyNotActiveMembers() {
        members[msg.sender].status = Data.memberStatus.asking;
        memberAddresses[membersCount] = msg.sender;
        ++membersCount;
        emit MemberAskedJoin(msg.sender);
    }

    function isActiveMember(address addressMember) public view returns (bool){
        return members[addressMember].status == Data.memberStatus.active;
    }

    function join() public onlyNotActiveMembers() {
        require((members[msg.sender].status == Data.memberStatus.invited && membershipModeMode == Data.membershipModeEnum.invite)
         || (members[msg.sender].status == Data.memberStatus.notMember && membershipModeMode == Data.membershipModeEnum.open)
                , "Impossible to join");
        members[msg.sender].status = Data.memberStatus.active;
        emit MemberJoined(msg.sender);
    }

    function authorizeContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
        authorizedContracts[_contractAddress] = true;
    }

    function denyContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
        authorizedContracts[_contractAddress] = false;
    }
}