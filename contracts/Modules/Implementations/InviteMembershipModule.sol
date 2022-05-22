// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../../Data.sol";
import "../../DaoBase.sol";


/**
* @title InviteMembershipModule
* @author chixx.eth & mourad
* @notice module membership 
*/
contract InviteMembershipModule is Ownable {
    using SafeMath for uint256;

    /// @notice store the module code hash
    bytes8 public constant moduleCode = bytes8(keccak256(abi.encode("InviteMembershipModule")));

    /// @notice store the module type hash
    bytes8 public constant moduleType = bytes8(keccak256(abi.encode("MemberModule")));

    /// @notice visibility of the members in MY-DAO
    Data.visibilityEnum public visibility;

    /**
    * @notice store daos info
    * @dev param address is address of the daoBase. return daoMember struct
    */
    mapping(address => Data.DaoMember) public daos;

    /**
    * @notice store daos info
    * @dev param address is address of the daoBase. return daoMember struct
    */
    mapping(address => mapping(address => bool)) public authorizedAddress;

    event MemberAdded(address newMember, address adderAddress);
    event MemberAccepted(address newMember, address acceptorAddress);
    event MemberInvited(address memberInvited, address memberInvitor);
    event MemberJoined(address memberJoined);
    event MemberAskedJoin(address memberRequestor);

    /**
    * @notice constructor change the owner to be the DaosFactory
    * @dev param 0 address of the DaosFactory
    */
    constructor(address _contractFactory) {
        _transferOwnership(_contractFactory);
    }

    /**
    * @notice check msg.sender is member or authorized
    * @dev param 0 address of the DaosFactory
    */
    modifier onlyActiveMembersOrAuthorizeAddress(address _contractDao) {
        require(daos[_contractDao].members[msg.sender].status == Data.memberStatus.active
        || authorizedAddress[_contractDao][msg.sender] == true
        || msg.sender == owner(), "Not authorized");
        _;
    }

    /**
    * @notice check msg.sender is not a member
    * @dev param 0 address of the DaosFactory
    */
    modifier onlyNotActiveMembers(address _contractDao) {
        require(daos[_contractDao].members[msg.sender].status != Data.memberStatus.active, "Not authorized");
        _;
    }

    /**
    * @notice check msg.sender is authorized
    * @dev param 0 address of the DaosFactory
    */
    modifier onlyAuthorizeAddress(address _contractDao) {
        require(authorizedAddress[_contractDao][msg.sender] == true, "Not authorized");
        _;
    }

    /**
    * @notice check msg.sender is authorized or the owner
    * @dev param 0 address of the DaosFactory
    */
    modifier onlyAuthorizeAddressOrOwner(address _contractDao) {
        require(authorizedAddress[_contractDao][msg.sender] == true || msg.sender == owner(), "Not authorized");
        _;
    }

    /**
    * @notice get info of a member in a dao
    * @param _contractDao address of the dao
    * @param _member address of the member
    * @return member struct taht store info of the member see ../../Data.sol
    */
    function getMemberInfo(address _contractDao, address _member) external view returns(Data.member memory) {
        return(daos[_contractDao].members[_member]);
    }

    /**
    * @notice get address of a member in a dao by his id
    * @param _contractDao address of the dao
    * @param _id id of the member
    * @return member address of the member
    */
    function getAddrById(address _contractDao, uint256 _id) external view returns(address) {
        return daos[_contractDao].memberAddresses[_id];
    }

    /**
    * @notice get the total member of the dao
    * @param _contractDao address of the dao
    * @return count uint256 of the total member in the dao
    */
    function getMembersCount(address _contractDao) external view returns(uint256) {
        return daos[_contractDao].membersCount;
    }

    /**
    * @notice add member to the dao
    * @dev only active member or authorized address can execute this function
    * @param _contractDao address of the dao
    * @param _addressMember address of the user that will be added
    */
    function addMember(address _contractDao, address _addressMember) public onlyActiveMembersOrAuthorizeAddress(_contractDao) {
        require(daos[_contractDao].members[_addressMember].status == Data.memberStatus.notMember
            , "Invalid Member: must be not a member");
        daos[_contractDao].members[_addressMember].status = Data.memberStatus.active;
        daos[_contractDao].memberAddresses[daos[_contractDao].membersCount] = _addressMember;
        daos[_contractDao].members[_addressMember].joinTime = block.timestamp;
        ++daos[_contractDao].membersCount;
        emit MemberAdded(_addressMember, msg.sender);
    }

    /**
    * @notice accept member to the dao
    * @dev only active member or authorized address can execute this function
    * @param _contractDao address of the dao
    * @param _addressMember address of the user that will be accepted
    */
    function acceptMember(address _contractDao, address _addressMember) public onlyActiveMembersOrAuthorizeAddress(_contractDao) {
        daos[_contractDao].members[_addressMember].status = Data.memberStatus.active;
        emit MemberAccepted(_addressMember, msg.sender);
    }

    /**
    * @notice invite member to the dao
    * @dev only active member or authorized address can execute this function
    * @param _contractDao address of the dao
    * @param _addressMember address of the user that will be invited
    */
    function inviteMember(address _contractDao, address _addressMember) public onlyActiveMembersOrAuthorizeAddress(_contractDao) {
        require(daos[_contractDao].members[_addressMember].status == Data.memberStatus.notMember
            , "Invalid Member: must be not a member");
        daos[_contractDao].members[_addressMember].status = Data.memberStatus.invited;
        daos[_contractDao].memberAddresses[daos[_contractDao].membersCount] = _addressMember;
        daos[_contractDao].members[_addressMember].joinTime = block.timestamp;
        ++daos[_contractDao].membersCount;
        emit MemberInvited(_addressMember, msg.sender);
    }

    /**
    * @notice request to be a member of the dao
    * @dev only not active member can execute this function
    * @param _contractDao address of the dao
    */
    function requestJoin(address _contractDao) public onlyNotActiveMembers(_contractDao) {
        daos[_contractDao].members[msg.sender].status = Data.memberStatus.asking;
        daos[_contractDao].memberAddresses[daos[_contractDao].membersCount] = msg.sender;
        daos[_contractDao].members[msg.sender].joinTime = block.timestamp;
        ++daos[_contractDao].membersCount;
        emit MemberAskedJoin(msg.sender);
    }

    /**
    * @notice return if a address is member of a dao
    * @param _contractDao address of the dao
    * @param _addressMember address of the user to check
    * @return bool true or false if is active
    */
    function isActiveMember(address _contractDao, address _addressMember) public view returns (bool){
        return daos[_contractDao].members[_addressMember].status == Data.memberStatus.active;
    }

    /**
    * @notice join a dao
    * @dev only not active member can execute this function
    * @param _contractDao address of the dao
    */
    function join(address _contractDao) public onlyNotActiveMembers(_contractDao) {
        require((daos[_contractDao].members[msg.sender].status == Data.memberStatus.invited)
                , "Impossible to join");
        daos[_contractDao].members[msg.sender].status = Data.memberStatus.active;
        emit MemberJoined(msg.sender);
    }

    /**
    * @notice link a dao to SimpleDonationsModule
    * @param _contractDao address of the dao
    * @param _memberDao address of the user of the dao in this case the owner of the dao
    */
    function addDao(address _contractDao, address _memberDao) external onlyAuthorizeAddressOrOwner(_contractDao) {
        require(!daos[_contractDao].isActive, "Dao already added");
        daos[_contractDao].isActive = true;
        daos[_contractDao].addressDao = _contractDao;
        addMember(_contractDao, _memberDao);
        authorizedAddress[_contractDao][_memberDao] = true;
    }

    /**
    * @notice authorize a new address
    * @param _contractDao address of the dao
    * @param _contractAddress address that will be authorized
    */
    function authorizeAddress(address _contractDao, address _contractAddress) external onlyAuthorizeAddressOrOwner(_contractDao) {
        authorizedAddress[_contractDao][_contractAddress] = true;
    }

    /**
    * @notice deny a authorized address
    * @param _contractDao address of the dao
    * @param _contractAddress address that will be deny
    */
    function denyAddress(address _contractDao, address _contractAddress) external onlyAuthorizeAddressOrOwner(_contractDao) {
        authorizedAddress[_contractDao][_contractAddress] = false;
    }
}