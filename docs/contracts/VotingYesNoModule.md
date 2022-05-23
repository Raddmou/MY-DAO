### VotingYesNoModule

  

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

###### createVote

duration ex: 1 day vote = 1\*24\*60\*60

| Name          | Type    | Description                         |
| ------------- | ------- | ----------------------------------- |
| \_contractDao | address | the address of the dao              |
| name          | string  | the name of the vote session        |
| description   | string  | the description of the vote session |
| duration      | uint256 | the timestamp for the duration      |

Returns:

No parameters

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

###### getVoteInfo

| Name           | Type    | Description |
| -------------- | ------- | ----------- |
| \_contractDao  | address |             |
| voteSessionId  | uint256 |             |
| \_voterAddress | address |             |

Returns:

| Name | Type  | Description |
| ---- | ----- | ----------- |
|      | tuple |             |

-----

###### getVoteSessionInfo

| Name          | Type    | Description |
| ------------- | ------- | ----------- |
| \_contractDao | address |             |
| voteSessionId | uint256 |             |

Returns:

| Name           | Type    | Description |
| -------------- | ------- | ----------- |
| creatorAddress | address |             |
| creationTime   | uint256 |             |
| name           | string  |             |
| description    | string  |             |
| isTerminated   | bool    |             |
| votersCount    | uint256 |             |
| duration       | uint256 |             |

-----

###### getVoterAddressById

| Name          | Type    | Description |
| ------------- | ------- | ----------- |
| \_contractDao | address |             |
| voteSessionId | uint256 |             |
| voterId       | uint256 |             |

Returns:

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | address |             |

-----

###### getVotersCount

| Name          | Type    | Description |
| ------------- | ------- | ----------- |
| \_contractDao | address |             |
| voteSessionId | uint256 |             |

Returns:

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | uint256 |             |

-----

###### getVotesCount

| Name          | Type    | Description |
| ------------- | ------- | ----------- |
| \_contractDao | address |             |

Returns:

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | uint256 |             |

-----

###### getVotesResult

| Name            | Type    | Description |
| --------------- | ------- | ----------- |
| \_contractDao   | address |             |
| \_voteSessionId | uint256 |             |

Returns:

| Name | Type      | Description |
| ---- | --------- | ----------- |
|      | tuple\[\] |             |

-----

###### hasVoted

| Name          | Type    | Description                |
| ------------- | ------- | -------------------------- |
| \_contractDao | address | the address of the dao     |
| voteSessionId | uint256 | the id of the vote session |
| voter         | address | the address of the voter   |

Returns:

| Name | Type | Description |
| ---- | ---- | ----------- |
|      | bool |             |

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

###### vote

| Name          | Type    | Description                                    |
| ------------- | ------- | ---------------------------------------------- |
| \_contractDao | address | the address of the dao                         |
| voteSessionId | uint256 | the id of the vote session                     |
| response      | uint8   | the response of the vote see enum responseEnum |

Returns:

No parameters

-----

###### voteSessions

**\*\*Add Documentation for the method here\*\***

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | address |             |
|      | uint256 |             |

Returns:

| Name           | Type    | Description |
| -------------- | ------- | ----------- |
| creatorAddress | address |             |
| creationTime   | uint256 |             |
| name           | string  |             |
| description    | string  |             |
| isTerminated   | bool    |             |
| votersCount    | uint256 |             |
| duration       | uint256 |             |
| isCreated      | bool    |             |

-----

###### voteSessionsCount

**\*\*Add Documentation for the method here\*\***

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | address |             |

Returns:

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | uint256 |             |

