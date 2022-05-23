### SimpleDonationsModule <span class="small">: SimpleDonationsModule</span>

Module Simple Donations: create a new donation instance with a preset
address for the receiver that cant be changed. When instance finish
everyone can send funds to receiver address

Author: chixx.eth & mourad

  

**Functions**

-----

###### constructor

param 0 address of the DaosFactory

\[object Object\]

| Name              | Type    | Description |
| ----------------- | ------- | ----------- |
| \_contractFactory | address |             |

Returns:

No parameters

-----

###### addDao

| Name          | Type    | Description                                                      |
| ------------- | ------- | ---------------------------------------------------------------- |
| \_contractDao | address | address of the dao                                               |
| \_memberDao   | address | address of the user of the dao in this case the owner of the dao |

Returns:

No parameters

-----

###### authorizeAddress

| Name              | Type    | Description                     |
| ----------------- | ------- | ------------------------------- |
| \_contractDao     | address | address of the dao              |
| \_contractAddress | address | address that will be authorized |

Returns:

No parameters

-----

###### authorizedAddress

**\*\*Add Documentation for the method here\*\***

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | address |             |
|      | address |             |

Returns:

| Name | Type | Description |
| ---- | ---- | ----------- |
|      | bool |             |

-----

###### createNewDonation

| Name          | Type    | Description               |
| ------------- | ------- | ------------------------- |
| \_contractDao | address | address of the dao        |
| \_receiver    | address | address that will be deny |
| \_startTime   | uint256 |                           |
| \_endTime     | uint256 |                           |

Returns:

No parameters

-----

###### daoDonations

**\*\*Add Documentation for the method here\*\***

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | address |             |
|      | uint256 |             |

Returns:

| Name           | Type    | Description |
| -------------- | ------- | ----------- |
| id             | uint256 |             |
| funds          | uint256 |             |
| receiverFunds  | address |             |
| donationsCount | uint256 |             |
| startTime      | uint256 |             |
| endTime        | uint256 |             |
| isActive       | bool    |             |

-----

###### daos

**\*\*Add Documentation for the method here\*\***

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | address |             |

Returns:

| Name       | Type    | Description |
| ---------- | ------- | ----------- |
| addressDao | address |             |
| isActive   | bool    |             |

-----

###### denyAddress

| Name              | Type    | Description               |
| ----------------- | ------- | ------------------------- |
| \_contractDao     | address | address of the dao        |
| \_contractAddress | address | address that will be deny |

Returns:

No parameters

-----

###### donate

only ETH can be send

| Name          | Type    | Description                 |
| ------------- | ------- | --------------------------- |
| \_contractDao | address | address of the dao          |
| \_nonce       | uint256 | id of the donation instance |

Returns:

No parameters

-----

###### moduleCode

**\*\*Add Documentation for the method here\*\***

No parameters

Returns:

| Name | Type   | Description |
| ---- | ------ | ----------- |
|      | bytes8 |             |

-----

###### moduleType

**\*\*Add Documentation for the method here\*\***

No parameters

Returns:

| Name | Type   | Description |
| ---- | ------ | ----------- |
|      | bytes8 |             |

-----

###### nonce

**\*\*Add Documentation for the method here\*\***

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | address |             |

Returns:

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | uint256 |             |

-----

###### owner

Returns the address of the current owner.

No parameters

Returns:

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | address |             |

-----

###### renounceOwnership

Leaves the contract without owner. It will not be possible to call
\`onlyOwner\` functions anymore. Can only be called by the current
owner. NOTE: Renouncing ownership will leave the contract without an
owner, thereby removing any functionality that is only available to the
owner.

No parameters

Returns:

No parameters

-----

###### sendFunds

the donation instance need to be finish

| Name          | Type    | Description                 |
| ------------- | ------- | --------------------------- |
| \_contractDao | address | address of the dao          |
| \_nonce       | uint256 | id of the donation instance |

Returns:

No parameters

-----

###### transferOwnership

Transfers ownership of the contract to a new account (\`newOwner\`). Can
only be called by the current owner.

| Name     | Type    | Description |
| -------- | ------- | ----------- |
| newOwner | address |             |

Returns:

No parameters
