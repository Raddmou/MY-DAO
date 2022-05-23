### DaosFactory <span class="small">: DaosFactory</span>

Smart contract for MY-DAO create/save daos, add/activate modules

Author: chixx.eth & mourad

  

**Functions**

-----

###### activateModuleForDao

| Name         | Type    | Description                                  |
| ------------ | ------- | -------------------------------------------- |
| \_daoAddress | address | : the dao address who activate the module    |
| \_type       | bytes8  | : the type hash of the module see ./Data.sol |
| \_code       | bytes8  | : the code hash of the module see ./Data.sol |

Returns:

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | address |             |

-----

###### addModule

| Name            | Type    | Description                                    |
| --------------- | ------- | ---------------------------------------------- |
| \_moduleAddress | address | : the dao address to add                       |
| \_type          | bytes8  | : the type hash of the module see ./Data.sol   |
| \_code          | bytes8  | : the code hash of the module see ./Data.sol   |
| \_isExclusive   | bool    | : if the type module can have multiple modules |

Returns:

No parameters

-----

###### createDAO

| Name          | Type      | Description                                  |
| ------------- | --------- | -------------------------------------------- |
| \_name        | string    | : the dao name                               |
| \_description | string    | : the dao description                        |
| \_visibility  | uint8     | : the visibility see ./Data.sol              |
| \_rules       | string    | : the dao rules                              |
| \_modules     | tuple\[\] | : array of modules type and code hash to add |

Returns:

No parameters

-----

###### daoOwners

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
|      | uint256 |             |

Returns:

| Name       | Type    | Description |
| ---------- | ------- | ----------- |
| owner      | address |             |
| daoAddress | address |             |

-----

###### getdeployedDaos

No parameters

Returns:

| Name | Type      | Description |
| ---- | --------- | ----------- |
|      | tuple\[\] |             |

-----

###### hash

| Name   | Type   | Description      |
| ------ | ------ | ---------------- |
| \_name | string | : string to hash |

Returns:

| Name | Type   | Description |
| ---- | ------ | ----------- |
|      | bytes8 |             |

-----

###### modulesDaos

**\*\*Add Documentation for the method here\*\***

| Name | Type   | Description |
| ---- | ------ | ----------- |
|      | bytes8 |             |
|      | bytes8 |             |

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
