import React, { useState } from 'react';
import { MODULE_MEMBER_CODE_INVITE, MODULE_MEMBER_CODE_OPEN, MODULE_MEMBER_CODE_REQUEST,
     MODULE_MEMBER_TYPE, MODULE_VOTE_CODE_YESNO, MODULE_VOTE_TYPE} from '../../redux/reducers/moduleTypes';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Person from '@mui/icons-material/Person';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Box from '@mui/material/Box';
import { deepOrange, yellow } from '@mui/material/colors';

import { getDaoNote, setDaoNote, joinDao, requestJoinDao } from '../../redux/reducers/actions';
import { useAppDispatch } from '../../hooks';
import { Dao } from '../../types';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
// import { deepOrange, blue } from '@mui/material/colors';

import { daosAPI } from '../../api';

type DaoCardProps = {
    dao: Dao
};

const DaoCard = ({ dao }: DaoCardProps) => {
    const { address, name, description, member, membershipMode, modules } = dao;
    const dispatch = useAppDispatch();
    // const [refresh, setRefresh] = useState(0);
    console.log("DaoCard member" + member + " address " +  address +  " modules " +  modules?.length);
    
    for (let index = 0; index < modules.length; index++) {
        console.log(" module type " + modules[index].type + " code " + modules[index].code);   
    }

    const handleClick = () => {
        dispatch(getDaoNote(address));
    }

    const handleClickJoinDao = () => {
        dispatch(joinDao(address));
        //dispatch(getDaoNote(address));
    }
    const handleClickRequestJoinDao = () => {
        dispatch(requestJoinDao(address));
        //dispatch(getDaoNote(address));
    }
    
    const handleClickJoinDaoInvitation = () => {
        dispatch(joinDao(address));
        // dispatch(getDaoNote(address));
        // const dao = await daosAPI.fetchDao(address);
        // dispatch(setDaoNote(dao));
        // setRefresh(refresh + 1);
    }

    const handleClickOpenVoteModule = () => {
        //TODO
        console.log("handleClickOpenVoteModule");
    }

    return (
        <ListItem button divider >
            <ListItemAvatar>
                <Avatar
                    sx={{ bgcolor: 'grey' }}
                    alt={name} 
                >
                    {name.charAt(0).toUpperCase()}
                    {/* {name} */}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} secondary={description} /> 

            <Box
            sx={{
                '& > :not(style)': {
                m: 2,
                },
            }}
            >
                {
                    modules?.some(a => a.type == MODULE_VOTE_TYPE && a.code == MODULE_VOTE_CODE_YESNO) 
                    &&  (
                    <Tooltip title="Vote">
                        <HowToVoteIcon fontSize="large" color="primary"
                        onClick={handleClickJoinDaoInvitation}/>
                        {/* </IconButton> */}
                    </Tooltip>
                    )
                }


                <Tooltip title="View Dao">
                    <ViewHeadlineIcon fontSize="large" color="primary"
                                    onClick={handleClick}/>
                </Tooltip>

                {
                    modules?.some(a => a.type == MODULE_MEMBER_TYPE && a.code == MODULE_MEMBER_CODE_REQUEST) 
                    && member == 2 
                    && (
                        <Tooltip title="Asking join Dao">
                            <Person fontSize="large" color="secondary"
                           />
                        </Tooltip>
                    )
                }
                {
                    modules?.some(a => a.type == MODULE_MEMBER_TYPE && a.code == MODULE_MEMBER_CODE_REQUEST) 
                    && member == 0 
                    && (
                        <Tooltip title="Request join Dao">
                            <GroupAddIcon fontSize="large" color="primary"
                            onClick={handleClickRequestJoinDao}/>
                        </Tooltip>
                    )
                }
                {
                    modules?.some(a => a.type == MODULE_MEMBER_TYPE && a.code == MODULE_MEMBER_CODE_OPEN) 
                    && member == 0 && (
                        <Tooltip title="Join Dao">
                            <GroupAddIcon fontSize="large" color="primary"
                            onClick={handleClickJoinDao}/>
                        </Tooltip>
                    )
                }
                {
                    modules?.some(a => a.type == MODULE_MEMBER_TYPE && a.code == MODULE_MEMBER_CODE_INVITE) 
                    && member == 0 && (
                        <Tooltip title="Not member">
                            <PersonOutlineIcon fontSize="large" color="primary"
                            />
                        </Tooltip>
                    )
                }
                { 
                    member == 3 && (
                        <Tooltip title="Active member">
                            {/* <IconButton>
                                <Avatar 
                                sx={{ bgcolor: blue[500] }}
                                />
                            </IconButton> */}
                            <Person fontSize="large" color="primary"/>
                        </Tooltip> 
                    )
                }
                {
                    modules?.some(a => a.type == MODULE_MEMBER_TYPE && a.code == MODULE_MEMBER_CODE_INVITE) 
                    && member == 1 && (
                        <Tooltip title="Pending invitation">
                            {/* <IconButton> */}
                                {/* <Avatar
                                sx={{ bgcolor: deepOrange[500] }}
                                alt="Accept invitation"
                            ></Avatar> */}
                            <Person fontSize="large" sx={{ color: deepOrange[500] }}
                            onClick={handleClickJoinDaoInvitation}/>
                            {/* </IconButton> */}
                        </Tooltip> 
                    )
                }

            </Box>

            
            { console.log(" membershipMode " + membershipMode) }
            { console.log(" member " + member) }
            
            {/* <Tooltip title="Active member">
                <IconButton>
                    <Avatar 
                    sx={{ bgcolor: blue[500] }}
                     />
                </IconButton>
            </Tooltip> 
            <Tooltip title="Pending invitation">
                <IconButton>
                    <Avatar
                    sx={{ bgcolor: deepOrange[500] }}
                    alt="Accept invitation"
                ></Avatar>
                </IconButton>
            </Tooltip>  */}
            
        </ListItem>
    )
};

export default DaoCard;