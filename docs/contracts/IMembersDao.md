<div id="ethdoc-viewer">

### IMembersDao <span class="small">: IMembersDao</span>

Interface for membership module

Author: chixx.eth & mourad

  

**Functions**

-----

###### getAddrById

| Name | Type    | Description        |
| ---- | ------- | ------------------ |
| dao  | address | address of the dao |
| id   | uint256 | id of the member   |

Returns:

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | address |             |

-----

###### getMemberInfo

| Name   | Type    | Description           |
| ------ | ------- | --------------------- |
| dao    | address | address of the dao    |
| member | address | address of the member |

Returns:

| Name | Type      | Description |
| ---- | --------- | ----------- |
|      | tuple\[\] |             |

-----

###### getMembersCount

| Name | Type    | Description        |
| ---- | ------- | ------------------ |
| dao  | address | address of the dao |

Returns:

| Name | Type    | Description |
| ---- | ------- | ----------- |
|      | uint256 |             |

-----

###### isActiveMember

| Name   | Type    | Description                  |
| ------ | ------- | ---------------------------- |
| dao    | address | address of the dao           |
| member | address | address of the user to check |

Returns:

| Name | Type | Description |
| ---- | ---- | ----------- |
|      | bool |             |

</div>
