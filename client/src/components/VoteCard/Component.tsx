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

import { getDaoNote, setDaoNote, joinDao, requestJoinDao, fetchVoteSessions } from '../../redux/reducers/actions';
import { useAppDispatch } from '../../hooks';
import { Dao, VoteSession } from '../../types';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
// import { deepOrange, blue } from '@mui/material/colors';

import { daosAPI } from '../../api';

type VoteCardProps = {
    voteSession: VoteSession
};

const VoteCard = ({ voteSession }: VoteCardProps) => {
    // const { address, name, description, member, membershipMode, modules } = dao;
    const { address, creationTime, name, description, isTerminated, votersCount
    , voters,  voteResult, duration} = voteSession;
    const dispatch = useAppDispatch();
    // const [refresh, setRefresh] = useState(0);

    const handleClick = () => {
        // dispatch(getDaoNote(address));
    }

    return (
        <ListItem button divider >
            <ListItemAvatar>
                <Avatar
                    sx={{ bgcolor: 'grey' }}
                    alt={name} 
                >
                    Vote
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
                {/* {
                    modules?.some(a => a.type == MODULE_VOTE_TYPE && a.code == MODULE_VOTE_CODE_YESNO) 
                    &&  (
                    <Tooltip title="Vote">
                        <HowToVoteIcon fontSize="large" color="primary"
                        onClick={handleClickOpenVoteModule}/>
                    </Tooltip>
                    )
                } */}


                <Tooltip title="View Dao">
                    <ViewHeadlineIcon fontSize="large" color="primary"
                                    onClick={handleClick}/>
                </Tooltip>

                

            </Box>            
        </ListItem>
    )
};

export default VoteCard;