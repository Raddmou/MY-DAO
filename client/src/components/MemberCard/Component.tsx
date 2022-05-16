import React, { useEffect, useState } from 'react';


import { MODULE_MEMBER_CODE_INVITE, MODULE_MEMBER_CODE_OPEN, MODULE_MEMBER_CODE_REQUEST,
    MODULE_MEMBER_TYPE, MODULE_VOTE_CODE_YESNO, MODULE_VOTE_TYPE} from '../../redux/reducers/moduleTypes';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import { Address } from "cluster";

import { getDaoNote } from '../../redux/reducers/actions';
import { useAppDispatch } from '../../hooks';
import { Member } from '../../types';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { deepOrange, blue } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import {  joinDao, acceptMember } from '../../redux/reducers/actions';
//import { useAppDispatch } from '../../hooks';

type MemberCardProps = {
    member: Member,
    isMember: number,
    daoAddress: Address,
    codeModule : string,
};

const MemberCard = ({ member, isMember, daoAddress, codeModule }: MemberCardProps) => {
    const [refresh, setRefresh] = useState(0);
    const { address, status, id } = member;
    const dispatch = useAppDispatch();

    useEffect((): void => {

    }, [refresh])

    const handleClickJoinDaoAsking = () => {
        console.log(" handleClickJoinDaoAsking " + daoAddress)
        if(isMember == 3)
            dispatch(acceptMember(daoAddress, address));
        //dispatch(getDaoNote(address));
    }

    const getContent = () =>
    {
        //active
        console.log("MemberCard status " + status);
        if(status == 3)
        {
            return (
                <Tooltip title="Active member">
                <IconButton>
                    <Avatar 
                    sx={{ bgcolor: blue[500] }}
                    />
                </IconButton>
            </Tooltip>   
            );
        }
        //asking
        else if(codeModule == MODULE_MEMBER_CODE_REQUEST && status == 2)
        {
            return (
                <Tooltip title="Accept asking to join">
                <IconButton>
                    <Avatar
                    sx={{ bgcolor: deepOrange[500] }}
                    onClick={handleClickJoinDaoAsking}
                ></Avatar>
                </IconButton>
            </Tooltip>   
            );
        }
        //invited
        else if(codeModule == MODULE_MEMBER_CODE_INVITE && status == 1)
        {
            return (
                <Tooltip title="Pending invitation to join">
                <IconButton>
                    <Avatar
                    sx={{ bgcolor: deepOrange[500] }}
                    
                ></Avatar>
                </IconButton>
            </Tooltip>    
            );
        }
    };

    return (
        // <ListItem>
        //     {/* <ListItemAvatar>
        //         <Avatar
        //             sx={{ bgcolor: 'grey' }}
        //         >
        //             { {address}}
        //         </Avatar>
        //     </ListItemAvatar>  */}
        //     <ListItemText primary={`Address ${address}`} />
        // </ListItem>

        // <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            // <ListItem alignItems="flex-start">
            //     <ListItemAvatar>
            //         { status == 3 ? (
            //         <Tooltip title="Active member">
            //                 <IconButton>
            //                     <Avatar 
            //                     sx={{ bgcolor: blue[500] }}
            //                     />
            //                 </IconButton>
            //             </Tooltip> 
            //         ) :  (
            //             <Tooltip title="Pending invitation">
            //                 <IconButton>
            //                 <Avatar
            //                     sx={{ bgcolor: deepOrange[500] }}
            //                     alt="Accept invitation"
            //                 ></Avatar>
            //                 </IconButton>
            //             </Tooltip> 
            //         )
            //         }
            //     {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
            //     </ListItemAvatar>
            //     <ListItemText
            //     primary={address}
            //     />
            // </ListItem>      
        // </List>

        <ListItem button divider>
            <ListItemText primary={address} /> 
            { 
                getContent()
                // status == 3 ? (
                //     <Tooltip title="Active member">
                //         <IconButton>
                //             <Avatar 
                //             sx={{ bgcolor: blue[500] }}
                //             />
                //         </IconButton>
                //     </Tooltip> 
                // ) :  (
                //     <Tooltip title="Pending invitation">
                //         <IconButton>
                //             <Avatar
                //             sx={{ bgcolor: deepOrange[500] }}
                //             alt="Accept invitation"
                //         ></Avatar>
                //         </IconButton>
                //     </Tooltip> 
                // )
            }            
        </ListItem>
        

    )
};

export default MemberCard;