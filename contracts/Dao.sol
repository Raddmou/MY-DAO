// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

//is DaosFactory
contract Dao is Ownable {
  using SafeMath for uint256;
  
    constructor (bool byInvitation)
    {
        if(byInvitation)
            mode = membershipMode.invite;
        else
            mode = membershipMode.open;
    }

  uint256[] public modules;
  string public name;
  uint256 public id;
  mapping(address => member) public members;
  membershipMode mode;
  //member[] public members;

  struct member {
        memberStatus status;
        //address memberAddress;
    }

  enum memberStatus {
        notMember,
        invited,
        asking,
        active
    }

    enum membershipMode {
        invite,
        request,
        open
    }

    function setName(string calldata _name) public {
       name = _name;
    }

    function addMember(address addressMember) public {
        members[addressMember].status = memberStatus.active;
    }

    function inviteMember(address addressMember) public {
        members[addressMember].status = memberStatus.invited;
    }

    function isActiveMember(address addressMember) public view returns (bool){
        return members[addressMember].status == memberStatus.active;
    }

    function join() public {
        require((members[msg.sender].status == memberStatus.invited && mode == membershipMode.invite) || (members[msg.sender].status == memberStatus.notMember && mode == membershipMode.open)
                , "Impossible to join");
        members[msg.sender].status = memberStatus.active;
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