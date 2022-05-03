// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract DaoERC721 {
  using SafeMath for uint256;
  address[] public owners;
  address[] public collectionApproved;
  bool public visibility;

  event AddApprovedCollection(address newApprovedCollection, address owner);
  event RemoveApprovedCollection(address collectionRemoved, address owner);

  constructor(address _owner, bool _visibility, address[] memory _approvedCollection) {
    owners.push(msg.sender);
    owners.push(_owner);
    visibility = _visibility;
    collectionApproved = _approvedCollection;
  }

  modifier onlyOwners() {
    bool success = false;
    for (uint256 i = 0; i < owners.length; i++) {
      if(msg.sender == owners[i])
        success = true;
    }
    require(success, "Failed u are not the owner");
    _;
  }

  function addApprovedCollection(address _newCollection) external onlyOwners() {
    collectionApproved.push(_newCollection);
    emit AddApprovedCollection(_newCollection, msg.sender);
  }
  function removeApprovedCollection(address _removedCollection) external onlyOwners() {
    if (collectionApproved.length == 1)
      collectionApproved.pop();
    for (uint256 i = 0; i < collectionApproved.length; ++i) {
      if (collectionApproved[i] == _removedCollection) {
        collectionApproved[i] = collectionApproved[collectionApproved.length.sub(1)];
        collectionApproved.pop();
      }
    }
    emit RemoveApprovedCollection(_removedCollection, msg.sender);
  }
}