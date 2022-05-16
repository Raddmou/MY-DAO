// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../../Data.sol";
import "../Interfaces/IMembersDAO.sol";
import "../../DaoBase.sol";

//is DaosFactory
contract VotingYesNoModule is Ownable {
    using SafeMath for uint256;
    //DaoBase private dao;
    IMembersDao private membersDao;
    uint256 public voteSessionsCount;
    mapping(address => mapping(uint256 => voteSession)) public voteSessions;
    mapping(address => Data.DaoMember) public daos;
    mapping(address => mapping(address => bool)) private authorizedContracts;
    address private memberModuleAddress;

    struct voteSession {
        address creatorAddress;
        uint256 creationTime;
        string name;
        string description;
        bool isTerminated;
        mapping(address => voteResult) votes;
        voteResult[] voteResults;
        durationEnum duration;
        bool isCreated;
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

    constructor(address _contractFactory) {
        _transferOwnership(_contractFactory);
    }

    modifier onlyAuthorizeContracts(address _contractDao) {
        require(authorizedContracts[_contractDao][msg.sender] == true, "Not authorized BB");
        _;
    }
    modifier onlyAuthorizeContractsOrOwner(address _contractDao) {
        require(authorizedContracts[_contractDao][msg.sender] == true || msg.sender == owner(), "Not authorized BBB");
        _;
    }

    function createVote(address _contractDao, string memory name, string memory description, uint8 duration) public {
        ++voteSessionsCount;
        voteSessions[_contractDao][voteSessionsCount].isTerminated = false;
        voteSessions[_contractDao][voteSessionsCount].name = name;
        voteSessions[_contractDao][voteSessionsCount].description = description;
        voteSessions[_contractDao][voteSessionsCount].creatorAddress = msg.sender;
        voteSessions[_contractDao][voteSessionsCount].duration = durationEnum(duration);
        
        emit VoteSessionCreated(msg.sender, name);
    }

    function vote(address _contractDao, uint256 voteSessionId, uint8 response) public {
        require(voteSessions[_contractDao][voteSessionId].isCreated, "Vote session not found");
        require(isVoteSessionDurationExpired(_contractDao, voteSessionId), "Vote session terminated");
        require(hasVoted(_contractDao, voteSessionId, msg.sender), "Already voted");
        require(IMembersDao(memberModuleAddress).isActiveMember(msg.sender), "Not DAO member");

        voteSessions[_contractDao][voteSessionsCount].votes[msg.sender].response = responseEnum(response);
        voteSessions[_contractDao][voteSessionsCount].votes[msg.sender].voted = true;
        voteSessions[_contractDao][voteSessionsCount].voteResults.push(voteResult(responseEnum(response), msg.sender, true));
        
        emit Voted(msg.sender, voteSessionId, responseEnum(response));
    }

    function isVoteSessionDurationExpired(address _contractDao, uint256 voteSessionId) public view returns (bool) {
        require(voteSessions[_contractDao][voteSessionId].isCreated, "Vote session not found");

        if(voteSessions[_contractDao][voteSessionId].isTerminated)
            return true;

        uint256 deltaTimestamp = block.timestamp - voteSessions[_contractDao][voteSessionId].creationTime;
        if(voteSessions[_contractDao][voteSessionId].duration == durationEnum.oneHour && deltaTimestamp > 1 hours)
            return true;
        if(voteSessions[_contractDao][voteSessionId].duration == durationEnum.oneDay && deltaTimestamp > 1 days)
            return true;

        return false;
    }    

    function hasVoted(address _contractDao, uint256 voteSessionId, address voter) public view returns (bool) {
        require(voteSessions[_contractDao][voteSessionId].isCreated, "Vote session not found");

        return voteSessions[_contractDao][voteSessionId].votes[voter].voted;
    }     

    function addDao(address _contractDao, address _memberDao) external onlyAuthorizeContractsOrOwner(_contractDao) {
        require(!daos[_contractDao].isActive, "Dao already added");
        daos[_contractDao].isActive = true;
        daos[_contractDao].addressDao = _contractDao;
        memberModuleAddress = DaoBase(_contractDao).getModuleData(bytes8(keccak256(abi.encode("MemberModule")))).moduleAddress;
    }

    function authorizeContract(address _contractDao, address _contractAddress) external onlyAuthorizeContractsOrOwner(_contractDao) {
        authorizedContracts[_contractDao][_contractAddress] = true;
    }

    function denyContract(address _contractDao, address _contractAddress) external onlyAuthorizeContractsOrOwner(_contractDao) {
        authorizedContracts[_contractDao][_contractAddress] = false;
    }
}