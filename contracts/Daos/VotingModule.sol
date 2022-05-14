// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../Data.sol";
import "../DaoBase.sol";

//is DaosFactory
contract VotingModule is Ownable {
    using SafeMath for uint256;
    DaoBase private dao;
    uint256 public voteSessionsCount;
    mapping(uint256 => vote) public voteSessions;

    struct voteSession {
        address creatorAdress;
        string name;
        string description;
        bool isTerminated;
        VoteResult result;
    }

    struct VoteResult {

    }

    struct VoteResponse {
        responseEnum response;
    }

    enum responseEnum {
        yes,
        no
    }

    constructor (address daoAddress)
    {
        dao = DaoBase(daoAddress);
    }

    function createVote(string memory name, string memory description, ) public onlyActiveMembersOrAuthorizeContracts() {
        members[addressMember].status = Data.memberStatus.active;
        memberAddresses[membersCount] = addressMember;
        ++membersCount;
        emit MemberAdded(addressMember);
    }
  
}