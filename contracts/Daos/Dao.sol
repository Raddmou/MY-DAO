// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../Data.sol";

//is DaosFactory
contract Dao is Ownable {
  using SafeMath for uint256;

  uint256[] public modules;
  string public name;
  string public description;
  uint256 public membersCount;
  mapping(uint256 => address) public memberAddresses;
  mapping(address => Data.member) public members;
  Data.membershipModeEnum public membershipModeMode;
  Data.visibilityEnum public visibility;
  mapping(address => bool) private authorizedContracts;
  //member[] public members;

  constructor (string memory _name, bool byInvitation, string memory _description, bool isPrivate)
    {
      name = _name;
      description = _description;
      if(byInvitation)
          membershipModeMode = Data.membershipModeEnum.invite;
      else
          membershipModeMode = Data.membershipModeEnum.open;
      if(isPrivate)
          visibility = Data.visibilityEnum.privateDao;
      else
          visibility = Data.visibilityEnum.publicDao;
    }

  event MemberAdded(address newMember);
  event MemberInvited(address memberInvitor, address memberInvited);
  event MemberJoined(address memberJoined);

//   struct member {
//         memberStatus status;
//         //address memberAddress;
//     }

//   enum visibilityEnum {
//         privateDao,
//         publicDao
//     }

//   enum memberStatus {
//         notMember,
//         invited,
//         asking,
//         active
//     }

    // enum membershipModeEnum {
    //     invite,
    //     request,
    //     open
    // }

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

    function setMode(Data.membershipModeEnum _mode) public onlyOwner() {
       membershipModeMode = _mode;
    }

    function getMemberShipMode() public view returns(Data.membershipModeEnum) {
       return membershipModeMode;
    }

    function setName(string memory _name) public onlyOwner() {
       name = _name;
    }

    function getName() public view returns(string memory) {
       return name;
    }

    function setDescription(string memory _description) public onlyOwner() {
       description = _description;
    }

    function getDescription() public view returns(string memory) {
       return description;
    }

    function getVisibility() public view returns(Data.visibilityEnum) {
       return visibility;
    }
    function getMemberInfo(address _member) external view returns(Data.member memory) {
        return(members[_member]);
    }
    function getInfoDao() external view returns(Data.daoData memory info) {
        info.daoType = "DAO, Invite or Request";
        info.visibility = visibility;
    }

    function addMember(address addressMember) public onlyActiveMembersOrAuthorizeContracts() {
        members[addressMember].status = Data.memberStatus.active;
        memberAddresses[membersCount] = addressMember;
        ++membersCount;
        emit MemberAdded(addressMember);
    }

    function inviteMember(address addressMember) public onlyActiveMembersOrAuthorizeContracts() {
        members[addressMember].status = Data.memberStatus.invited;
        memberAddresses[membersCount] = addressMember;
        ++membersCount;
        emit MemberInvited(msg.sender, addressMember);
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