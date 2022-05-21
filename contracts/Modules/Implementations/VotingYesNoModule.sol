// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../../Data.sol";
import "../Interfaces/IMembersDAO.sol";
import "../../DaoBase.sol";

contract VotingYesNoModule is Ownable {
    using SafeMath for uint256;
    IMembersDao private membersDao;
    mapping(address => uint256) public voteSessionsCount;
    mapping(address => mapping(uint256 => voteSession)) public voteSessions;
    mapping(address => Data.DaoMember) public daos;
    mapping(address => mapping(address => bool)) public authorizedAddress;
    mapping(address => address) private memberModuleAddresses;

    struct voteSession {
        address creatorAddress;
        uint256 creationTime;
        string name;
        string description;
        bool isTerminated;
        uint256 votersCount;
        mapping(address => voteResult) votes;
        mapping(uint256 => address) voterAddresses;
        voteResult[] voteResults;
        uint256 duration;
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

    event VoteSessionCreated(address creatorAddress, string name, string description, uint256 id);
    event Voted(address voterAddress, uint256 voteSessionId, responseEnum response);

    constructor(address _contractFactory) {
        _transferOwnership(_contractFactory);
    }

    modifier onlyAuthorizeAddress(address _contractDao) {
        require(authorizedAddress[_contractDao][msg.sender] == true, "Not authorized BB");
        _;
    }
    modifier onlyAuthorizeAddressOrOwner(address _contractDao) {
        require(authorizedAddress[_contractDao][msg.sender] == true || msg.sender == owner(), "Not authorized BBB");
        _;
    }

    function getVotesCount(address _contractDao) public view returns (uint256)
    {
        return voteSessionsCount[_contractDao];
    }

    // function getVote(address _contractDao, uint256 voteSessionId) external view returns (voteSession memory)
    // {
    //     return (voteSessions[_contractDao][voteSessionId]);
    // }

    function getVoteInfo(address _contractDao, uint256 voteSessionId, address _voterAddress)
        external
        view
        returns(voteResult memory)
    {
        return(voteSessions[_contractDao][voteSessionId].votes[_voterAddress]);
    }

    function getVoteSessionInfo(address _contractDao, uint256 voteSessionId)
        external
        view 
        returns
    (
        address creatorAddress,
        uint256 creationTime,
        string memory name,
        string memory description,
        bool isTerminated,
        uint256 votersCount,
        uint256 duration
    ) {
        creatorAddress = voteSessions[_contractDao][voteSessionId].creatorAddress;
        creationTime = voteSessions[_contractDao][voteSessionId].creationTime;
        name = voteSessions[_contractDao][voteSessionId].name;
        description = voteSessions[_contractDao][voteSessionId].description;
        isTerminated = voteSessions[_contractDao][voteSessionId].isTerminated;
        votersCount = voteSessions[_contractDao][voteSessionId].votersCount;
        duration = voteSessions[_contractDao][voteSessionId].duration;
    }

    function getVoterAddressById(address _contractDao, uint256 voteSessionId, uint256 voterId)
        external
        view
        returns(address)
    {
        return voteSessions[_contractDao][voteSessionId].voterAddresses[voterId];
    }

    function getVotersCount(address _contractDao, uint256 voteSessionId)
        external
        view
        returns(uint256)
    {
        return voteSessions[_contractDao][voteSessionId].votersCount;
    }

    function createVote(
        address _contractDao,
        string memory name,
        string memory description,
        uint256 duration
    )   
        public
    {
        require(IMembersDao(memberModuleAddresses[_contractDao]).isActiveMember(_contractDao, msg.sender), "Not DAO member");
        
        voteSessions[_contractDao][voteSessionsCount[_contractDao]].isTerminated = false;
        voteSessions[_contractDao][voteSessionsCount[_contractDao]].isCreated = true;
        voteSessions[_contractDao][voteSessionsCount[_contractDao]].creationTime = block.timestamp;
        voteSessions[_contractDao][voteSessionsCount[_contractDao]].name = name;
        voteSessions[_contractDao][voteSessionsCount[_contractDao]].description = description;
        voteSessions[_contractDao][voteSessionsCount[_contractDao]].creatorAddress = msg.sender;
        voteSessions[_contractDao][voteSessionsCount[_contractDao]].duration = duration;
        voteSessions[_contractDao][voteSessionsCount[_contractDao]].votes[msg.sender].voted = false;
        ++voteSessionsCount[_contractDao];

        emit VoteSessionCreated(msg.sender, name, description, voteSessionsCount[_contractDao] - 1);
    }

    function vote(address _contractDao, uint256 voteSessionId, uint8 response) public {
        require(voteSessions[_contractDao][voteSessionId].isCreated, "Vote session not found");
        require(block.timestamp < voteSessions[_contractDao][voteSessionId].creationTime 
            + voteSessions[_contractDao][voteSessionId].duration, "Vote session terminated");
        require(!hasVoted(_contractDao, voteSessionId, msg.sender), "Already voted");
        require(IMembersDao(memberModuleAddresses[_contractDao]).isActiveMember(_contractDao, msg.sender), "Not DAO member");

        //add voter address
        voteSessions[_contractDao][voteSessionId].voterAddresses[voteSessions[_contractDao][voteSessionId].votersCount] = msg.sender;
        ++voteSessions[_contractDao][voteSessionId].votersCount;

        //add voter vote
        voteSessions[_contractDao][voteSessionId].votes[msg.sender].response = responseEnum(response);
        voteSessions[_contractDao][voteSessionId].votes[msg.sender].voted = true;
        voteSessions[_contractDao][voteSessionId].voteResults.push(voteResult(responseEnum(response), msg.sender, true));
        
        emit Voted(msg.sender, voteSessionId, responseEnum(response));
    }

    function hasVoted(address _contractDao, uint256 voteSessionId, address voter)
        public
        view
        returns(bool)
    {
        require(voteSessions[_contractDao][voteSessionId].isCreated, "Vote session not found");

        return voteSessions[_contractDao][voteSessionId].votes[voter].voted;
    }

    function addDao(address _contractDao, address _memberDao)
        external
        onlyAuthorizeAddressOrOwner(_contractDao)
    {
        require(!daos[_contractDao].isActive, "Dao already added");
        daos[_contractDao].isActive = true;
        daos[_contractDao].addressDao = _contractDao;
        memberModuleAddresses[_contractDao] = DaoBase(_contractDao)
            .getModuleDataByIndex(bytes8(keccak256(abi.encode("MemberModule"))), 0).moduleAddress;
        authorizedAddress[_contractDao][_memberDao] = true;
    }

    function authorizeAddress(address _contractDao, address _contractAddress)
        external
        onlyAuthorizeAddressOrOwner(_contractDao)
    {
        authorizedAddress[_contractDao][_contractAddress] = true;
    }

    function denyAddress(address _contractDao, address _contractAddress)
        external
        onlyAuthorizeAddressOrOwner(_contractDao)
    {
        authorizedAddress[_contractDao][_contractAddress] = false;
    }
}