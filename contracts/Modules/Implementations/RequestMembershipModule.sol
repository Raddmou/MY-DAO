// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../../Data.sol";
import "../../DaoBase.sol";

contract RequestMembershipModule is Ownable {
  using SafeMath for uint256;
  bytes8 public moduleCode = bytes8(keccak256(abi.encode("RequestMembershipModule")));
  bytes8 public moduleType = bytes8(keccak256(abi.encode("MemberModule")));
  mapping(address => Data.DaoMember) public daos;
  Data.visibilityEnum public visibility;
  mapping(address => mapping(address => bool)) private authorizedContracts;

  event MemberAdded(address newMember, address adderAddress);
  event MemberAccepted(address newMember, address acceptorAddress);
  event MemberInvited(address memberInvited, address memberInvitor);
  event MemberJoined(address memberJoined);
  event MemberAskedJoin(address memberRequestor);

    modifier onlyActiveMembersOrAuthorizeContracts(address _contractDao) {
        require(daos[_contractDao].members[msg.sender].status == Data.memberStatus.active 
        || authorizedContracts[_contractDao][msg.sender] == true, "Not authorized");
        _;
    }

    modifier onlyNotActiveMembers(address _contractDao) {
        require(daos[_contractDao].members[msg.sender].status != Data.memberStatus.active, "Not authorized");
        _;
    }

    modifier onlyAuthorizeContracts(address _contractDao) {
        require(authorizedContracts[_contractDao][msg.sender] == true, "Not authorized");
        _;
    }

    modifier onlyAuthorizeContractsOrOwner(address _contractDao) {
        require(((authorizedContracts[_contractDao][msg.sender] == true) || msg.sender == owner()), "Not authorized");
        _;
    }

    function getMemberInfo(address _contractDao, address _member) external view returns(Data.member memory) {
        return(daos[_contractDao].members[_member]);
    }
    function getAddrById(address _contractDao, uint256 id) external view returns(address) {
        return daos[_contractDao].memberAddresses[id];
    }
    function getMembersCount(address _contractDao) external view returns(uint256) {
        return daos[_contractDao].membersCount;
    }

    function addMember(address _contractDao, address addressMember) public onlyActiveMembersOrAuthorizeContracts(_contractDao) {
        daos[_contractDao].members[addressMember].status = Data.memberStatus.active;
        daos[_contractDao].memberAddresses[daos[_contractDao].membersCount] = addressMember;
        ++daos[_contractDao].membersCount;
        emit MemberAdded(addressMember, msg.sender);
    }

    function acceptMember(address _contractDao, address addressMember) public onlyActiveMembersOrAuthorizeContracts(_contractDao) {
        daos[_contractDao].members[addressMember].status = Data.memberStatus.active;
        emit MemberAccepted(addressMember, msg.sender);
    }

    function requestJoin(address _contractDao) public onlyNotActiveMembers(_contractDao) {
        daos[_contractDao].members[msg.sender].status = Data.memberStatus.asking;
        daos[_contractDao].memberAddresses[daos[_contractDao].membersCount] = msg.sender;
        ++daos[_contractDao].membersCount;
        emit MemberAskedJoin(msg.sender);
    }

    function isActiveMember(address _contractDao, address addressMember) public view returns (bool){
        return daos[_contractDao].members[addressMember].status == Data.memberStatus.active;
    }

    function addDao(address _contractDao, address _memberDao) external onlyAuthorizeContracts(_contractDao) {
        require(!daos[_contractDao].isActive, "Dao already added");
        daos[_contractDao].isActive = true;
        daos[_contractDao].addressDao = _contractDao;
        addMember(_contractDao, _memberDao);
    }

    function authorizeContract(address _contractDao, address _contractAddress) external onlyAuthorizeContractsOrOwner(_contractDao) {
        authorizedContracts[_contractDao][_contractAddress] = true;
    }

    function denyContract(address _contractDao, address _contractAddress) external onlyAuthorizeContractsOrOwner(_contractDao) {
        authorizedContracts[_contractDao][_contractAddress] = false;
    }
}