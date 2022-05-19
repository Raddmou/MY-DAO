// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../../Data.sol";
import "../Interfaces/IMembersDAO.sol";
import "../../DaoBase.sol";

contract SimpleDonationsModule is Ownable, ReentrancyGuard {
  using SafeMath for uint256;
  bytes8 public moduleCode = bytes8(keccak256(abi.encode("SimpleDonationsModule")));
  bytes8 public moduleType = bytes8(keccak256(abi.encode("FundsModule")));

  mapping(address => daosInfo) public daos;
  mapping(address => mapping(address => bool)) public authorizedContracts; // address = DaoBaseAddr => address authorized => true or false
  mapping(address => address) private memberModuleAddress; // address = DaoBaseAddr => address memberModule
  mapping(address => mapping(uint256 => daoDonationsInfo)) public daoDonations; // addresDaoBase => nonce => funds
  mapping(address => uint256) public nonce;

  struct daosInfo {
    address addressDao;
    bool isActive;
  }
  struct daoDonationsInfo {
    uint256 id;
    uint256 funds;
    address receiverFunds;
    uint256 donationsCount;
    uint256 startTime;
    uint256 endTime;
    bool isActive;
  }

  event NewDonations(address contractDao, address receiver);

  constructor(address _contractFactory) {
    _transferOwnership(_contractFactory);
  }

  modifier onlyAuthorizeContracts(address _contractDao) {
    require(authorizedContracts[_contractDao][msg.sender] == true, "Not authorized");
    _;
  }
  modifier onlyAuthorizeContractsOrOwner(address _contractDao) {
    require(authorizedContracts[_contractDao][msg.sender] == true || msg.sender == owner(), "Not authorized");
    _;
  }
  function addDao(address _contractDao, address _memberDao) external onlyAuthorizeContractsOrOwner(_contractDao) {
    require(!daos[_contractDao].isActive, "Dao already added");
    daos[_contractDao].isActive = true;
    daos[_contractDao].addressDao = _contractDao;
    nonce[_contractDao] = 0;
    memberModuleAddress[_contractDao] = DaoBase(_contractDao).getModuleData(bytes8(keccak256(abi.encode("MemberModule")))).moduleAddress;
  }

  function authorizeContract(address _contractDao, address _contractAddress) external onlyAuthorizeContractsOrOwner(_contractDao) {
    authorizedContracts[_contractDao][_contractAddress] = true;
  }

  function denyContract(address _contractDao, address _contractAddress) external onlyAuthorizeContractsOrOwner(_contractDao) {
    authorizedContracts[_contractDao][_contractAddress] = false;
  }

  function createNewDonation(
    address _contractDao,
    address _receiver,
    uint256 _startTime,
    uint256 _endTime
  ) external onlyAuthorizeContractsOrOwner(_contractDao) {
    daoDonationsInfo memory info;
    info.id = nonce[_contractDao];
    info.receiverFunds = _receiver;
    info.donationsCount = 0;
    info.funds = 0;
    info.startTime = _startTime > block.timestamp ? _startTime : block.timestamp;
    info.endTime = _endTime > block.timestamp ? _endTime : block.timestamp.add(1 weeks);
    info.isActive = true;
    daoDonations[_contractDao][nonce[_contractDao]] = info;
  }
  function donate(address _contractDao, uint256 _nonce) external payable {
    daoDonationsInfo memory info = daoDonations[_contractDao][nonce[_contractDao]];
    require(info.endTime > block.timestamp, "Outdated");
    info.funds = info.funds.add(msg.value);
    info.donationsCount = info.donationsCount.add(1);
    daoDonations[_contractDao][nonce[_contractDao]] = info;
  }
  function sendFunds(address _contractDao, uint256 _nonce) external nonReentrant() {
    daoDonationsInfo memory info = daoDonations[_contractDao][nonce[_contractDao]];
    require(info.endTime < block.timestamp, "Failed not finish");
    (bool success, ) = payable(info.receiverFunds).call{value: info.funds}("");
    info.funds = 0;
    info.isActive = false;
  }
}