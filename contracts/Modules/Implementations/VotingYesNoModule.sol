// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../../Data.sol";
import "../Interfaces/IMembersDAO.sol";
import "../../DaoBase.sol";

contract VotingYesNoModule is Ownable {
    using SafeMath for uint256;
    /// @notice import MembershipModule interface for members
    IMembersDao private membersDao;

    /**
    * @notice store count of all votes of a dao
    * @dev param address is address of the daoBase. return vote count
    */
    mapping(address => uint256) public voteSessionsCount;

    /**
    * @notice store vote session data
    * @dev param address is address of the daoBase, param uint256 the id of the vote session.
    * return voteSession struct
    */
    mapping(address => mapping(uint256 => voteSession)) public voteSessions;

    /**
    * @notice store daos info
    * @dev param address is address of the daoBase. return daoMember struct
    */
    mapping(address => Data.DaoMember) public daos;

    /**
    * @notice store authorized address
    * @dev param0 address is address of the daoBase, param1 address to authorized. return bool true or false
    */
    mapping(address => mapping(address => bool)) public authorizedAddress;

    /**
    * @notice store membership module address of the daoBase
    * @dev param0 address is address of the daoBase. return address of the membership module
    */
    mapping(address => address) private memberModuleAddresses;

    /**
    * @notice store vote session data
    * @return creatorAddress: the address who create the trade
    * @return creationTime: timestamp of the time the vote is created
    * @return name: name of the vote session
    * @return description: description of the vote session
    * @return isTerminated: if the vote is finish
    * @return votersCount: how many votes this session as
    * @return votes: the vote result of an specific address
    * @return voterAddresses: the addres linked to the id
    * @return voteResults: array of all vote result
    * @return duration: timestamp of the duration 
    * @return isCreated:
    */
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

    /**
    * @notice store vote result
    * @return response: the response of the vote
    * @return voter: the address who submit the vote
    * @return voted: true or false if user voted
    */
    struct voteResult {
        responseEnum response;
        address voter;
        bool voted;
    }

    /**
    * @notice store vote result
    * @return response: the response of the vote
    * @return voteNumbers: the id of the vote
    */
    struct voteResponseResult {
        responseEnum response;
        uint256 voteNumbers;
    } 

    /**
    * @notice enum for response
    * @return yes: yes
    * @return no: no
    */
    enum responseEnum {
        yes,
        no
    }

    
    event VoteSessionCreated(address creatorAddress, string name, string description, uint256 id);
    event Voted(address voterAddress, uint256 voteSessionId, responseEnum response);

    /**
    * @notice constructor change the owner to be the DaosFactory
    * @dev param 0 address of the DaosFactory
    */
    constructor(address _contractFactory) {
        _transferOwnership(_contractFactory);
    }

     /**
    * @notice check msg.sender is authorized
    * @dev param 0 address of the DaosFactory
    */
    modifier onlyAuthorizeAddress(address _contractDao) {
        require(authorizedAddress[_contractDao][msg.sender] == true, "Not authorized BB");
        _;
    }

    /**
    * @notice check msg.sender is authorized or the owner
    * @dev param 0 address of the DaosFactory
    */
    modifier onlyAuthorizeAddressOrOwner(address _contractDao) {
        require(authorizedAddress[_contractDao][msg.sender] == true || msg.sender == owner(), "Not authorized BBB");
        _;
    }

    /**
    * @notice get vote session count of a specific dao
    * @return voteSessionsCount: the vote session count
    */
    function getVotesCount(address _contractDao) public view returns (uint256)
    {
        return voteSessionsCount[_contractDao];
    }

    /**
    * @notice get vote result of a specific session of the dao
    * @return voteResults: array of the voteResults struct
    */
    function getVotesResult(address _contractDao, uint256 _voteSessionId)
        public
        view
        returns(voteResult[] memory)
    {
        return(voteSessions[_contractDao][_voteSessionId].voteResults);
    }

    /**
    * @notice get vote info of a specific voter address
    * @return voteResults: struct of the result info
    */
    function getVoteInfo(address _contractDao, uint256 voteSessionId, address _voterAddress)
        external
        view
        returns(voteResult memory)
    {
        return(voteSessions[_contractDao][voteSessionId].votes[_voterAddress]);
    }

    /**
    * @notice get vote session info of a specific session
    * @return creatorAddress the address who create the trade
    * @return creationTime timestamp of the time the vote is created
    * @return name name of the vote session
    * @return description description of the vote session
    * @return isTerminated if the vote is finish
    * @return votersCount how many votes this session as
    * @return duration timestamp of the duration 
    */
    function getVoteSessionInfo(address _contractDao, uint256 voteSessionId)
        external
        view 
        returns (
            address creatorAddress,
            uint256 creationTime,
            string memory name,
            string memory description,
            bool isTerminated,
            uint256 votersCount,
            uint256 duration
        )
    {
        creatorAddress = voteSessions[_contractDao][voteSessionId].creatorAddress;
        creationTime = voteSessions[_contractDao][voteSessionId].creationTime;
        name = voteSessions[_contractDao][voteSessionId].name;
        description = voteSessions[_contractDao][voteSessionId].description;
        isTerminated = voteSessions[_contractDao][voteSessionId].isTerminated;
        votersCount = voteSessions[_contractDao][voteSessionId].votersCount;
        duration = voteSessions[_contractDao][voteSessionId].duration;
    }

    /**
    * @notice get address of the voter by his id
    * @return voterAddresses: the voter address
    */
    function getVoterAddressById(address _contractDao, uint256 voteSessionId, uint256 voterId)
        external
        view
        returns(address)
    {
        return voteSessions[_contractDao][voteSessionId].voterAddresses[voterId];
    }

    /**
    * @notice get voter count of a vote session
    * @return votersCount the voter count
    */
    function getVotersCount(address _contractDao, uint256 voteSessionId)
        external
        view
        returns(uint256)
    {
        return voteSessions[_contractDao][voteSessionId].votersCount;
    }

    /**
    * @notice create a new vote session
    * @dev duration ex: 1 day vote = 1*24*60*60
    * @param _contractDao the address of the dao
    * @param name the name of the vote session
    * @param description the description of the vote session
    * @param duration the timestamp for the duration
    */
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

    /**
    * @notice submit a vote
    * @param _contractDao the address of the dao
    * @param voteSessionId the id of the vote session
    * @param response the response of the vote see enum responseEnum
    */
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

    /**
    * @notice get if a specific address has voted
    * @param _contractDao the address of the dao
    * @param voteSessionId the id of the vote session
    * @param voter the address of the voter
    */
    function hasVoted(address _contractDao, uint256 voteSessionId, address voter)
        public
        view
        returns(bool)
    {
        require(voteSessions[_contractDao][voteSessionId].isCreated, "Vote session not found");

        return voteSessions[_contractDao][voteSessionId].votes[voter].voted;
    }

    /**
    * @notice link a dao to SimpleDonationsModule
    * @param _contractDao address of the dao
    * @param _memberDao address of the user of the dao in this case the owner of the dao
    */
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

    /**
    * @notice authorize a new address
    * @param _contractDao address of the dao
    * @param _contractAddress address that will be authorized
    */
    function authorizeAddress(address _contractDao, address _contractAddress)
        external
        onlyAuthorizeAddressOrOwner(_contractDao)
    {
        authorizedAddress[_contractDao][_contractAddress] = true;
    }

    /**
    * @notice deny a authorized address
    * @param _contractDao address of the dao
    * @param _contractAddress address that will be deny
    */
    function denyAddress(address _contractDao, address _contractAddress)
        external
        onlyAuthorizeAddressOrOwner(_contractDao)
    {
        authorizedAddress[_contractDao][_contractAddress] = false;
    }
}