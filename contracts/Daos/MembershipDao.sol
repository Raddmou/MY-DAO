// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.9;

// import "../../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";

// //is DaosFactory
// contract MembershipDao is Ownable {
//   using SafeMath for uint256;
//   uint256 public id;
//   mapping(address => member) public members;
//   membershipModeEnum public membershipModeMode;
//   mapping(address => bool) private authorizedContracts;
//   //member[] public members;

//   constructor (string memory _name, bool byInvitation, string memory _description)
//     {
//       name = _name;
//       description = _description;
//       if(byInvitation)
//           membershipModeMode = membershipModeEnum.invite;
//       else
//           membershipModeMode = membershipModeEnum.open;
//     }

//   event MemberAdded(address newMember);
//   event MemberInvited(address memberInvitor, address memberInvited);
//   event MemberJoined(address memberJoined);

//   struct member {
//         memberStatus status;
//         //address memberAddress;
//     }

//   enum memberStatus {
//         notMember,
//         invited,
//         asking,
//         active
//     }

//     enum membershipModeEnum {
//         invite,
//         request,
//         open
//     }

//     modifier onlyActiveMembersOrAuthorizeContracts() {
//         require(members[msg.sender].status == memberStatus.active || authorizedContracts[msg.sender] == true, "Not authorized");
//         _;
//     }

//     modifier onlyNotActiveMembers() {
//         require(members[msg.sender].status != memberStatus.active, "Not authorized");
//         _;
//     }

//     modifier onlyAuthorizeContracts() {
//         require(authorizedContracts[msg.sender] == true, "Not authorized");
//         _;
//     }

//     modifier onlyAuthorizeContractsOrOwner() {
//         require(((authorizedContracts[msg.sender] == true) || msg.sender == owner()), "Not authorized");
//         _;
//     }

//     function setMode(membershipModeEnum _mode) public onlyOwner() {
//        membershipModeMode = _mode;
//     }

//     function getMemberShipMode() public view returns(membershipModeEnum) {
//        return membershipModeMode;
//     }

//     function addMember(address addressMember) public onlyActiveMembersOrAuthorizeContracts() {
//         members[addressMember].status = memberStatus.active;
//         emit MemberAdded(addressMember);
//     }

//     function inviteMember(address addressMember) public onlyActiveMembersOrAuthorizeContracts() {
//         members[addressMember].status = memberStatus.invited;
//         emit MemberInvited(msg.sender, addressMember);
//     }

//     function isActiveMember(address addressMember) public view returns (bool){
//         return members[addressMember].status == memberStatus.active;
//     }

//     function join() public onlyNotActiveMembers() {
//         require((members[msg.sender].status == memberStatus.invited && membershipModeMode == membershipModeEnum.invite)
//          || (members[msg.sender].status == memberStatus.notMember && membershipModeMode == membershipModeEnum.open)
//                 , "Impossible to join");
//         members[msg.sender].status = memberStatus.active;
//         emit MemberJoined(msg.sender);
//     }

//     function authorizeContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
//         authorizedContracts[_contractAddress] = true;
//     }

//     function denyContract(address _contractAddress) external onlyAuthorizeContractsOrOwner() {
//         authorizedContracts[_contractAddress] = false;
//     }
// }