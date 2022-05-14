import React, { useState } from 'react';

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
import { Module } from '../../types';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
// import { deepOrange, blue } from '@mui/material/colors';

import { daosAPI } from '../../api';

type DaoCardProps = {
    module: Module
};

const DaoCard = ({ dao }: DaoCardProps) => {
    const { address, type, code } = module;
    const dispatch = useAppDispatch();
    // const [refresh, setRefresh] = useState(0);
    
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

    return (
        <ListItem button divider >
            <ListItemAvatar>
                <Avatar
                    sx={{ bgcolor: 'grey' }}
                    alt={type} 
                >
                    {type.charAt(0).toUpperCase()}
                    {/* {name} */}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={type} secondary={code} /> 

            <Box
            sx={{
                '& > :not(style)': {
                m: 2,
                },
            }}
            >
                <Tooltip title="View Dao">
                    <ViewHeadlineIcon fontSize="large" color="primary"
                                    onClick={handleClick}/>
                </Tooltip>
            </Box>

            
            { console.log(" membershipMode " + code) }
            { console.log(" member " + type) }
            
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