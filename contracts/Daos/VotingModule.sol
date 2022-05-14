// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../Data.sol";
import "../DaoBase.sol";

//is DaosFactory
contract VotingYesNo is Ownable {
    using SafeMath for uint256;
    DaoBase private dao;
    IMembersDao private membersDao;
    uint256 public voteSessionsCount;
    mapping(uint256 => vote) public voteSessions;

    struct voteSession {
        address creatorAdress;
        uint256 creationTime;
        string name;
        string description;
        bool isTerminated;
        // voteResult[] votes;
        mapping(address => voteResult) votes;
        voteSessionResult result;
        durationEnum duration;
        bool isCreated;
    }

    struct voteSessionResult {

    }

    struct voteResult {
        responseEnum response;
        address voter;
        bool voted;
    }

    struct voteResponseResult {
        responseEnum response;
        uint256 voteNumbers;
    } 

    enum responseEnum {
        yes,
        no
    }

    enum durationEnum {
        oneHour,
        oneDay
    }

    event VoteSessionCreated(address creatorAddress, string name);
    event Voted(address voterAddress, uint256 voteSessionId, responseEnum response);

    constructor (address daoAddress, address membersDaoAddress)
    {
        dao = DaoBase(daoAddress);
        membersDao = IMembersDao(membersDaoAddress);
    }

    function createVote(string memory name, string memory description, uint8 duration) public onlyActiveMembersOrAuthorizeContracts() {
        ++voteSessionsCount;
        voteSessions[voteSessionsCount].isTerminated = false;
        voteSessions[voteSessionsCount].name = name;
        voteSessions[voteSessionsCount].description = description;
        voteSessions[voteSessionsCount].creatorAddress = msg.sender;
        voteSessions[voteSessionsCount].duration = durationEnum(duration);
        
        emit VoteSessionCreated(msg.sender, name);
    }

    function vote(uint256 voteSessionId, uint8 response) public onlyActiveMembersOrAuthorizeContracts() {
        require(voteSessions[voteSessionId].isCreated, "Vote session not found");
        require(isVoteSessionDurationExpired(voteSessionId), "Vote session terminated");
        require(hasVoted(voteSessionId, msg.sender), "Already voted");

        voteSessions[voteSessionsCount].votes[msg.sender].response = responseEnum(response);
        voteSessions[voteSessionsCount].votes[msg.sender].voted = true;
        
        emit Voted(msg.sender, voteSessionId, response);
    }

    function isVoteSessionDurationExpired(uint256 voteSessionId) public view returns (bool) {
        require(voteSessions[voteSessionId].isCreated, "Vote session not found");

        if(voteSessions[voteSessionId].isTerminated)
            return true;

        uint256 deltaTimestamp = block.timestamp - voteSessions[voteSessionId].creationTime;
        if(voteSessions[voteSessionId].duration == durationEnum.oneHour && deltaTimestamp > 3600)
            return true;
        if(voteSessions[voteSessionId].duration == durationEnum.oneDay && deltaTimestamp > 86400)
            return true;

        return false;
    }    

    function hasVoted(uint256 voteSessionId, address voter) public view returns (bool) {
        require(voteSessions[voteSessionId].isCreated, "Vote session not found");

        return voteSessions[voteSessionId].votes[voter].voted;
    }     
  
}