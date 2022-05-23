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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Alert from '@mui/material/Alert';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { useSearchParams, Link } from "react-router-dom";
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


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
    const [isFinished, setIsFinished] = useState(false);
    const hasVotedTemp = voters?.some(a => a.toLowerCase() == (window as any).ethereum.selectedAddress.toLowerCase());
    const [hasVoted, setHasVoted] = useState(hasVotedTemp);
    

    const handleVoteYesClick = async () => {
        await dispatch(voteYesNo(address, id, 1));
        setOpen(true);
    }

    const handleVoteNoClick = async () => {
        await dispatch(voteYesNo(address, id, 0));
        setHasVoted(true);
        setOpen(true);
    }

    const [open, setOpen] = React.useState(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    useEffect((): void => {
        console.log(" vote session  duration " + voteSession.duration + " creationTime " 
        + voteSession.creationTime + " isTerminated  "+ voteSession.isTerminated + " voters " + voters[0]);
        console.log(" hasVotedTemp " + voteSession.voted);
        console.log( "creation time " + new Date(voteSession.creationTime * 1000));
        
        console.log( "Date() - new Date(voteSession.creationTime* 1000) " + (Date() - new Date(voteSession.creationTime* 1000)));
        console.log( "... " + ((Date.now() - voteSession.creationTime) + Number(voteSession.duration *  1000)));
        console.log( "Date.now() " +Date.now());
        console.log( "CreationTime " + new Date(voteSession.creationTime * 1000));
        console.log( "diff  " + (new Date().getTime() - new Date(voteSession.creationTime * 1000)));
        console.log( "reste " + ((new Date().getTime() - new Date(voteSession.creationTime * 1000)) + Number(voteSession.duration *  1000)));
        console.log( "Diff now - creation " + (Date.now() - (voteSession.creationTime * 1000) + Number(voteSession.duration *  1000)));
    }, [isFinished, hasVoted])

    
    //const isVoteFinished = (Date.now() - (voteSession.creationTime)) < 0 ? true : false;
    console.log(" isvotepending " + isVotePending);
    const restDuration = ((new Date(new Date().getTime()) - new Date(voteSession.creationTime * 1000)) + Number(voteSession.duration * 1000));
    const dateFinish = new Date(new Date().getTime() + (new Date(voteSession.creationTime * 1000) - new Date(new Date().getTime())) + Number(voteSession.duration * 1000));
    console.log( "delta " + (dateFinish - new Date(new Date().getTime())) );
    console.log(" restDuration " + restDuration);
    //const dateRestDuration = new Date(Date.now() + (restDuration));
    const dateRestDuration = new Date(new Date().getTime() + restDuration);
    console.log( "dateRestDuration  " + dateRestDuration);
    console.log( "CreationTime " + new Date(voteSession.creationTime * 1000));
    console.log( "Now " + new Date(new Date().getTime()));
    console.log( "diff creation time and now " + new Date(new Date().getTime() + (new Date(voteSession.creationTime * 1000) - new Date(new Date().getTime())) + Number(voteSession.duration * 1000)));
    console.log( "Duration " + voteSession.duration);
    console.log( "diff date now restDuration  " + (restDuration - new Date().getTime()));
    console.log( "restDuration  " + restDuration);
    const isVotePending = (dateFinish - new Date(new Date().getTime())) > 0 ? true : false;
    const isVoteFinished = isVotePending ? false : true;
    const creationTimeFormatted: string = (new Date(voteSession.creationTime * 1000)).toDateString();
    const nombreResultYes = voteSession?.voteResult.filter(a => a.response == 1)?.length ?? 0;
    const nombreResultNo = voteSession?.voteResult.filter(a => a.response == 0)?.length ?? 0;
    var winnerResponse = -1;
    winnerResponse = nombreResultYes > nombreResultNo ? 1 : -1;
    winnerResponse = nombreResultNo > nombreResultYes ? 0 : -1;
    //console.log( "nombreResultYes "+ voteSession?.voteResult[0].response );
    console.log( "nombreResultNo "+ nombreResultNo );

    const Completionist = () => <span>Terminated!</span>;

    const renderer = async ({ hours, minutes, seconds, completed }) => {
        // setIsFinished(completed);
        if (completed) {   
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

        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
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
                
                <Stack direction="row" spacing={1}>
                   
                    {
                        hasVoted && (
                            <Chip label="Has voted" variant="outlined" color="secondary"/>
                        )
                    }
                    {
                        isVoteFinished && 
                        (winnerResponse != 0) 
                        && (
                            <Badge badgeContent={nombreResultNo} variant="outlined" color="primary">
                                <Chip label="No" variant="outlined" color="primary"/>
                            </Badge>
                        )
                    }
                    {
                        isVoteFinished && 
                        (winnerResponse == 0) 
                        && (
                            <Badge badgeContent={nombreResultNo} color="primary">
                                <Chip label="No" color="primary"/>
                            </Badge>
                        )
                    }
                    {
                         isVoteFinished && 
                         (winnerResponse != 1) 
                         && (
                            <Badge badgeContent={nombreResultYes} variant="outlined" color="primary">
                                <Chip label="Yes" variant="outlined" color="primary"/>
                            </Badge>
                        )
                    }
                    {
                        isVoteFinished && 
                        (winnerResponse == 1) 
                        && (
                            <Badge badgeContent={nombreResultYes} color="primary">
                                <Chip label="Yes" color="primary"/>
                            </Badge>
                        )
                    }
                    {
                        isVotePending && (
                            <Chip label="Pending"  color="primary"/>
                        )
                    }
                     {
                        isVoteFinished && (
                        <Chip label="Terminated" color="primary"/> 
                        )
                    }
                    
                </Stack>
                
                
                
                {
                    isVotePending && (
                        <StyledBadge badgeContent={<Countdown date={dateFinish} />} color="secondary">
                            <TimerIcon color="disabled"/>
                        </StyledBadge>
                    )
                }
                

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

                <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Has voted
                    </Alert>
                </Snackbar>
                </Stack>

            </Box>            
        </ListItem>
        </AccordionSummary>
        <AccordionDetails>
        <Box
                                    sx={{
                                        '& > :not(style)': {
                                        m: 2,
                                        },
                                    }}
                                    >
                                        <div className="textInput">
                                            <TextField
                                                size="small"
                                                fullWidth
                                                id="name"
                                                name="name"
                                                label="Name"
                                                value={name}
                                                disabled
                                            />
                                        </div>
                                        <div className="textInput">
                                            <TextField
                                                size="small"
                                                fullWidth
                                                id="description"
                                                name="description"
                                                label="Description"
                                                multiline
                                                rows={4}
                                                value={description}
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <ToggleButtonGroup
                                                color="primary"
                                                id="member"
                                                name="duration"
                                                label="member"
                                                value={duration}
                                                exclusive>
                                                <ToggleButton disabled value="3600">One hour</ToggleButton>
                                                <ToggleButton disabled value="86400">One day</ToggleButton>
                                                <ToggleButton disabled value="604800">One week</ToggleButton>
                                            </ToggleButtonGroup>
                                        </div> 
                                        <div>
                                            <Stack direction="row" spacing={1}>

                                                    <Chip label="Creation date" variant="outlined" color="primary"/> 
                                                    <Chip label={creationTimeFormatted} variant="outlined" color="primary"/>
                                                    <Chip label="Creator" variant="outlined" color="primary"/>
                                                    <Chip label={voteSession.creatorAddress} variant="outlined" color="primary"/>
                                            </Stack>

                                            {/* <FormControl>
                                                <FormLabel id="demo-row-radio-buttons-group-label">Duration</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="duration"
                                                    value={duration}
                                                >
                                                    <FormControlLabel value="3600" disabled control={<Radio />} label="One hour" />                          
                                                    <FormControlLabel value="86400" disabled control={<Radio />} label="One day" /> 
                                                    <FormControlLabel value="604800" disabled control={<Radio />} label="One week"/>
                                                </RadioGroup>
                                            </FormControl> */}
                                         </div>  
                                         <div>
                                         {
                                                isVotePending 
                                                && (hasVoted == false)
                                                && (
                                                    <Tooltip title="Vote">
                                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                            <Button 
                                                            onClick={handleVoteNoClick}
                                                            startIcon={<ThumbDownAltIcon />}>No</Button>
                                                            <Button 
                                                            onClick={handleVoteNoClick}
                                                            endIcon={<ThumbUpAltIcon />}>Yes</Button>
                                                        </ButtonGroup>
                                                    </Tooltip>
                                                )
                                            }    
                                         </div>                             
                            </Box>   
        </AccordionDetails>
      </Accordion>

        


    )
};

export default VoteCard;