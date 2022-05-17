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
    mapping(address => uint256) public voteSessionsCount;
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
        uint256 votersCount;
        mapping(address => voteResult) votes;
        mapping(uint256 => address) voterAddresses;
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

    function getVotesCount(address _contractDao) public view returns (uint256)
    {
        return voteSessionsCount[_contractDao];
    }

    // function getVote(address _contractDao, uint256 voteSessionId) external view returns (voteSession memory)
    // {
    //     return (voteSessions[_contractDao][voteSessionId]);
    // }

    function getVoteInfo(address _contractDao, uint256 voteSessionId, address _voterAddress) external view returns(voteResult memory) {
        return(voteSessions[_contractDao][voteSessionId].votes[_voterAddress]);
    }

    function getVoteSessionInfo(address _contractDao, uint256 voteSessionId) external view returns(address creatorAddress,
                                                                                                                            uint256 creationTime,
                                                                                                                            string memory name,
                                                                                                                            string memory description,
                                                                                                                            bool isTerminated,
                                                                                                                            uint256 votersCount) {
         creatorAddress = voteSessions[_contractDao][voteSessionId].creatorAddress;
         creationTime = voteSessions[_contractDao][voteSessionId].creationTime;
         name = voteSessions[_contractDao][voteSessionId].name;
         description = voteSessions[_contractDao][voteSessionId].description;
         isTerminated = voteSessions[_contractDao][voteSessionId].isTerminated;
         votersCount = voteSessions[_contractDao][voteSessionId].votersCount;
    }

    function getVoterAddressById(address _contractDao, uint256 voteSessionId, uint256 voterId) external view returns(address) {
        return voteSessions[_contractDao][voteSessionId].voterAddresses[voterId];
    }

    function getVotersCount(address _contractDao, uint256 voteSessionId) external view returns(uint256) {
        return voteSessions[_contractDao][voteSessionId].votersCount;
    }

    function createVote(address _contractDao, string memory name, string memory description, uint8 duration) public {
        ++voteSessionsCount[_contractDao];
        voteSessions[_contractDao][voteSessionsCount[_contractDao]].isTerminated = false;
        voteSessions[_contractDao][voteSessionsCount[_contractDao]].name = name;
        voteSessions[_contractDao][voteSessionsCount[_contractDao]].description = description;
        voteSessions[_contractDao][voteSessionsCount[_contractDao]].creatorAddress = msg.sender;
        voteSessions[_contractDao][voteSessionsCount[_contractDao]].duration = durationEnum(duration);
        
        emit VoteSessionCreated(msg.sender, name);
    }

    function vote(address _contractDao, uint256 voteSessionId, uint8 response) public {
        require(voteSessions[_contractDao][voteSessionId].isCreated, "Vote session not found");
        require(isVoteSessionDurationExpired(_contractDao, voteSessionId), "Vote session terminated");
        require(hasVoted(_contractDao, voteSessionId, msg.sender), "Already voted");
        require(IMembersDao(memberModuleAddress).isActiveMember(_contractDao, msg.sender), "Not DAO member");

        //add voter address
        voteSessions[_contractDao][voteSessionId].voterAddresses[voteSessions[_contractDao][voteSessionId].votersCount] = msg.sender;
        ++voteSessions[_contractDao][voteSessionId].votersCount;

        //add voter vote
        voteSessions[_contractDao][voteSessionId].votes[msg.sender].response = responseEnum(response);
        voteSessions[_contractDao][voteSessionId].votes[msg.sender].voted = true;
        voteSessions[_contractDao][voteSessionId].voteResults.push(voteResult(responseEnum(response), msg.sender, true));
        
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