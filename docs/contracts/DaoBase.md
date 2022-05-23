
### DaoBase <span class="small">: DaoBase</span>

DaoBase represents a DAO, deployed by DaosFactory to create a new dao.
DaoBase store general infos and all the modules references for the dao

Author: chixx.eth & Mourad M.

  

**Functions**

-----

###### constructor

\[object Object\]

| Name          | Type   | Description                          |
| ------------- | ------ | ------------------------------------ |
| \_name        | string | name of the Dao                      |
| \_description | string | description of the Dao               |
| \_visibility  | uint8  | visibility of the dao see ./Data.sol |
| \_rules       | string | rules of the Dao                     |

Returns:

No parameters

-----

###### addModule

| Name          | Type    | Description                                 |
| ------------- | ------- | ------------------------------------------- |
| \_type        | bytes8  | type hash of the module                     |
| \_code        | bytes8  | code hash of the module                     |
| \_moduleAddr  | address | address of the module                       |
| \_isExclusive | bool    | if the type module can have multiple module |

Returns:

No parameters

-----

###### authorizeContract

| Name              | Type    | Description           |
| ----------------- | ------- | --------------------- |
| \_contractAddress | address | address to authorized |

Returns:

No parameters

-----

###### denyContract

| Name              | Type    | Description                   |
| ----------------- | ------- | ----------------------------- |
| \_contractAddress | address | address to deny authorization |

Returns:

No parameters

-----

###### description

**\*\*Add Documentation for the method here\*\***

No parameters

Returns:

| Name | Type   | Description |
| ---- | ------ | ----------- |
|      | string |             |

-----

###### getDaoSettings

No parameters

Returns:

| Name | Type  | Description |
| ---- | ----- | ----------- |
|      | tuple |             |

-----

###### getModuleData

| Name   | Type   | Description             |
| ------ | ------ | ----------------------- |
| \_type | bytes8 | type hash of the module |

Returns:

| Name | Type      | Description |
| ---- | --------- | ----------- |
|      | tuple\[\] |             |

-----

###### getModuleDataByIndex

| Name    | Type    | Description             |
| ------- | ------- | ----------------------- |
| \_type  | bytes8  | type hash of the module |
| \_index | uint256 | index of the module     |

Returns:

| Name | Type  | Description |
| ---- | ----- | ----------- |
|      | tuple |             |

-----

###### moduleType

**\*\*Add Documentation for the method here\*\***

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | uint256 |             |

Returns:

| Name | Type   | Description |
| ---- | ------ | ----------- |
|      | bytes8 |             |

-----

###### modules

**\*\*Add Documentation for the method here\*\***

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | bytes8  |             |
|      | uint256 |             |

Returns:

| Name          | Type    | Description |
| ------------- | ------- | ----------- |
| id            | uint256 |             |
| moduleAddress | address |             |
| isActive      | bool    |             |
| isExclusive   | bool    |             |
| moduleType    | bytes8  |             |
| moduleCode    | bytes8  |             |
| moduleInfo    | string  |             |

-----

###### modulesTypeCount

**\*\*Add Documentation for the method here\*\***

No parameters

Returns:

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | uint256 |             |

-----

###### name

**\*\*Add Documentation for the method here\*\***

No parameters

Returns:

| Name | Type   | Description |
| ---- | ------ | ----------- |
|      | string |             |

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

###### rules

**\*\*Add Documentation for the method here\*\***

No parameters

Returns:

| Name | Type   | Description |
| ---- | ------ | ----------- |
|      | string |             |

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
