import React, { useEffect, useState } from 'react';
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

import { voteYesNo, fetchVoteSessions } from '../../redux/reducers/actions';
import { useAppDispatch } from '../../hooks';
import { Dao, VoteSession } from '../../types';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
// import { deepOrange, blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TimerIcon from '@mui/icons-material/Timer';
import SnackbarContent from '@mui/material/SnackbarContent';
import ReactDOM from "react-dom";
import Countdown from "react-countdown";

import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';


import { daosAPI } from '../../api';
import { number } from 'yup/lib/locale';

type VoteCardProps = {
    voteSession: VoteSession,
    address: Address,
    id: Number
};

const VoteCard = ({ voteSession, address, id }: VoteCardProps) => {
    // const { address, name, description, member, membershipMode, modules } = dao;
    const { creationTime, name, description, isTerminated, votersCount
    , voters,  voteResult, duration} = voteSession;
    const dispatch = useAppDispatch();
    // const [refresh, setRefresh] = useState(0);
    const [isFinished, setIsFinished] = useState(isTerminated);
    const hasVotedTemp = voters?.some(a => a.voterAdress == (window as any).ethereum.selectedAddress);
    const [hasVoted, setHasVoted] = useState(hasVotedTemp);
    

    const handleVoteYesClick = () => {
        dispatch(voteYesNo(address, id, 1));
    }

    const handleVoteNoClick = () => {
        dispatch(voteYesNo(address, id, 0));
    }

    useEffect((): void => {

    }, [isFinished, hasVoted])

    const Completionist = () => <span>Terminated!</span>;

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            setIsFinished(true);
          // Render a complete state
          return <Completionist />;
        } else {
          // Render a countdown
          return (
            <span>
              {hours}:{minutes}:{seconds}
            </span>
          );
        }
      };

      const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -38,
          top: 0,
          'background-color': 'rgba(0, 0, 0, 0.26)',
          'color': 'white',
          border: `2px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
        },
      }));

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
            
            {/* <SnackbarContent message="I love snacks." />
                <SnackbarContent
                    message={
                    'I love candy. I love cookies. I love cupcakes. \
                    I love cheesecake. I love chocolate.'
                    }
            /> */}
            {/* <Stack direction="row" spacing={10}>
                <Chip size="large" >
                    <Countdown date={Date.now() + 10000000} />
                </Chip>
            </Stack>
            <Stack direction="row" spacing={1}>
            <Countdown  date={Date.now() + 2000}
                renderer={renderer}  />
            </Stack> */}

            <Stack direction="row" spacing={5}>
                
                
                
                <Tooltip title="Vote">
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button disabled={isFinished || hasVoted}
                        onClick={handleVoteNoClick}
                        startIcon={<ThumbDownAltIcon />}>No</Button>
                        <Button disabled={isFinished || hasVoted}
                        onClick={handleVoteNoClick}
                         endIcon={<ThumbUpAltIcon />}>Yes</Button>
                    </ButtonGroup>
                </Tooltip>

                <StyledBadge badgeContent={<Countdown date={Date.now() + 2000} />} color="secondary">
                    <TimerIcon color="disabled"/>
                </StyledBadge>

                {/* <Tooltip title="View Dao">
                    <ViewHeadlineIcon fontSize="large" color="primary"
                                    onClick={handleClick}/>
                </Tooltip> */}

                
            </Stack>
                

            <Box
            sx={{
                '& > :not(style)': {
                m: 1,
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

                

                

                

            </Box>            
        </ListItem>
    )
};

export default VoteCard;