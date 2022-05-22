// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../../Data.sol";
import "../Interfaces/IMembersDAO.sol";
import "../../DaoBase.sol";

/**
* @title SimpleDonationsModule
* @author chixx.eth & mourad
* @notice Module Simple Donations: create a new donation instance with a preset address for 
* the receiver that cant be changed. When instance finish everyone can send funds to receiver address
*/
contract SimpleDonationsModule is Ownable, ReentrancyGuard {
  using SafeMath for uint256;

  /// @notice store the module code hash
  bytes8 public constant moduleCode = bytes8(keccak256(abi.encode("SimpleDonationsModule")));

  /// @notice store the module code hash
  bytes8 public constant moduleType = bytes8(keccak256(abi.encode("FundsModule")));

  /**
  * @notice store daos info
  * @dev param address is address of the daoBase. return daosInfo struct
  */
  mapping(address => daosInfo) public daos;

  /**
  * @notice store authorized address
  * @dev param0 address is address of the daoBase, param1 address to authorized. return bool true or false
  */
  mapping(address => mapping(address => bool)) public authorizedAddress;
  
  /**
  * @notice store membership module address of the daoBase
  * @dev param0 address is address of the daoBase. return address of the membership module
  */
  mapping(address => address) private memberModuleAddress; // address = DaoBaseAddr => address memberModule
  
  /**
  * @notice store each instance of donation
  * @dev param0 address is address of the daoBase, param 1 the nonce of the instance.
  * return dao donation instance info see struct daoDonationsInfo
  */
  mapping(address => mapping(uint256 => daoDonationsInfo)) public daoDonations; // addresDaoBase => nonce => funds
  
  /**
  * @notice store total nonce of a dao
  * @dev param0 address is address of the daoBase. return the total nonce
  */
  mapping(address => uint256) public nonce;

  /**
  * @notice store dao info
  * @return addressDao the address of the dao
  * @return isActive if the dao is active
  */
  struct daosInfo {
    address addressDao;
    bool isActive;
  }

  /**
  * @notice store dao donation instance info
  * @return id the id of the instance linked to the nonce
  * @return funds how many funds the instance have
  * @return receiverFunds address of the receiver of the funds
  * @return donationsCount how many user have donate funds
  * @return startTime timestamp of the start of the donation instance
  * @return endTime timestamp of the end of the donation instance
  * @return isActivate bool true or false if its active or not
  */
  struct daoDonationsInfo {
    uint256 id;
    uint256 funds;
    address receiverFunds;
    uint256 donationsCount;
    uint256 startTime;
    uint256 endTime;
    bool isActive;
  }

  event CreateNewDonations(address contractDao, address receiver, uint256 startTime, uint256 endTime);
  event NewDonation(address contractDao, uint256 nonce, uint256 amount);

  /**
  * @notice constructor change the owner to be the DaosFactory
  * @dev param 0 address of the DaosFactory
  */
  constructor(address _contractFactory) {
    _transferOwnership(_contractFactory);
  }

  /// @notice check if msg.sender is authorized
  modifier onlyAuthorizeAddress(address _contractDao) {
    require(authorizedAddress[_contractDao][msg.sender] == true, "Not authorized");
    _;
  }

  /// @notice check if msg.sender is authorized
  modifier onlyAuthorizeAddressOrOwner(address _contractDao) {
    require(authorizedAddress[_contractDao][msg.sender] == true || msg.sender == owner(), "Not authorized");
    _;
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
    nonce[_contractDao] = 0;
    authorizedAddress[_contractDao][_memberDao] = true;
    memberModuleAddress[_contractDao] = DaoBase(_contractDao)
      .getModuleDataByIndex(bytes8(keccak256(abi.encode("MemberModule"))), 0).moduleAddress;
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

  /**
  * @notice deny a authorized address
  * @param _contractDao address of the dao
  * @param _receiver address that will be deny
  */
  function createNewDonation(
    address _contractDao,
    address _receiver,
    uint256 _startTime,
    uint256 _endTime
  )
    external
    onlyAuthorizeAddressOrOwner(_contractDao)
  {
    daoDonationsInfo memory info;
    info.id = nonce[_contractDao];
    info.receiverFunds = _receiver;
    info.donationsCount = 0;
    info.funds = 0;
    info.startTime = _startTime > block.timestamp ? _startTime : block.timestamp;
    info.endTime = _endTime > block.timestamp ? _endTime : block.timestamp.add(1 weeks);
    info.isActive = true;
    daoDonations[_contractDao][nonce[_contractDao]] = info;
    ++nonce[_contractDao];
    emit CreateNewDonations(_contractDao, _receiver, _startTime, _endTime);
  }

  /**
  * @notice donate fund
  * @dev only ETH can be send
  * @param _contractDao address of the dao
  * @param _nonce id of the donation instance
  */
  function donate(address _contractDao, uint256 _nonce) external payable {
    daoDonationsInfo memory info = daoDonations[_contractDao][_nonce];
    require(info.endTime > block.timestamp, "Outdated");
    info.funds = info.funds.add(msg.value);
    info.donationsCount = info.donationsCount.add(1);
    daoDonations[_contractDao][_nonce] = info;
    emit NewDonation(_contractDao, _nonce, msg.value);
  }

  /**
  * @notice send fund to receiver
  * @dev the donation instance need to be finish
  * @param _contractDao address of the dao
  * @param _nonce id of the donation instance
  */
  function sendFunds(address _contractDao, uint256 _nonce) external nonReentrant() {
    daoDonationsInfo memory info = daoDonations[_contractDao][_nonce];
    require(info.endTime < block.timestamp, "Failed not finish");
    (bool success, ) = payable(info.receiverFunds).call{value: info.funds}("");
    require(success, "Fail withdraw");
    info.funds = 0;
    info.isActive = false;
    daoDonations[_contractDao][_nonce] = info;
  }
}