// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library Data {
  struct member {
    memberStatus status;
    //address memberAddress;
  }

  enum visibilityEnum {
    privateDao,
    publicDao
  }

  enum memberStatus {
    notMember,
    invited,
    asking,
    active
  }

  enum membershipModeEnum {
    invite,
    request,
    open
  }
}