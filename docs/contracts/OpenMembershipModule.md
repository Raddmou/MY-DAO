<div id="ethdoc-viewer">

### OpenMembershipModule

  

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

###### addMember

only active member or authorized address can execute this function

| Name            | Type    | Description                            |
| --------------- | ------- | -------------------------------------- |
| \_contractDao   | address | address of the dao                     |
| \_addressMember | address | address of the user that will be added |

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

###### daos

**\*\*Add Documentation for the method here\*\***

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | address |             |

Returns:

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| addressDao   | address |             |
| membersCount | uint256 |             |
| isActive     | bool    |             |

-----

###### denyAddress

| Name              | Type    | Description               |
| ----------------- | ------- | ------------------------- |
| \_contractDao     | address | address of the dao        |
| \_contractAddress | address | address that will be deny |

Returns:

No parameters

-----

###### getAddrById

| Name          | Type    | Description        |
| ------------- | ------- | ------------------ |
| \_contractDao | address | address of the dao |
| \_id          | uint256 | id of the member   |

Returns:

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | address |             |

-----

###### getMemberInfo

| Name          | Type    | Description           |
| ------------- | ------- | --------------------- |
| \_contractDao | address | address of the dao    |
| \_member      | address | address of the member |

Returns:

| Name | Type  | Description |
| ---- | ----- | ----------- |
|      | tuple |             |

-----

###### getMembersCount

| Name          | Type    | Description        |
| ------------- | ------- | ------------------ |
| \_contractDao | address | address of the dao |

Returns:

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | uint256 |             |

-----

###### isActiveMember

| Name            | Type    | Description                  |
| --------------- | ------- | ---------------------------- |
| \_contractDao   | address | address of the dao           |
| \_addressMember | address | address of the user to check |

Returns:

| Name | Type | Description |
| ---- | ---- | ----------- |
|      | bool |             |

-----

###### join

only not active member can execute this function

| Name          | Type    | Description        |
| ------------- | ------- | ------------------ |
| \_contractDao | address | address of the dao |

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

###### transferOwnership

Transfers ownership of the contract to a new account (\`newOwner\`). Can
only be called by the current owner.

| Name     | Type    | Description |
| -------- | ------- | ----------- |
| newOwner | address |             |

Returns:

No parameters

-----

###### visibility

**\*\*Add Documentation for the method here\*\***

No parameters

Returns:

| Name | Type  | Description |
| ---- | ----- | ----------- |
|      | uint8 |             |

</div>
