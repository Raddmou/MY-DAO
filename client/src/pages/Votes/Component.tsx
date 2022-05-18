import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MODULE_MEMBER_CODE_INVITE, MODULE_MEMBER_CODE_OPEN, MODULE_MEMBER_CODE_REQUEST,
    MODULE_MEMBER_TYPE, MODULE_VOTE_CODE_YESNO, MODULE_VOTE_TYPE} from '../../redux/reducers/moduleTypes';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, Switch } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import MemberCard from '../../components/MemberCard/Component';
import ListItem from '@mui/material/ListItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { inviteToDao } from '../../redux/reducers/actions';
import { Member, InviteDaoFormValues } from '../../types';
import { getDaoByMember, clearDaoNote, clearVoteSessions, clearVoteModule , fetchVoteSessions} from '../../redux/reducers/actions';
import VotesList from '../../components/VotesList/Component';
import Pagination from '../../components/Pagination/Component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { VotesSelector } from './selector';
import { DEFAULT_PAGE, PAGE_LIMIT } from './constants';
import './Component.scss';

const Votes: React.FC = () => {
    const [addressToInvite, setAddressToInvite] = useState("");
    const [ searchParams, setSearchParams ] = useSearchParams({});
    //const { citizensCount, citizenNote, account } = useAppSelector(homeSelector);
    const { voteSessions, voteModule, account } = useAppSelector(VotesSelector);
    const dispatch = useAppDispatch();
    //const address = searchParams.get('dao');

    const handleNoteClose = (): void => {
        dispatch(clearDaoNote());
    };

    const handleVoteClose = (): void => {
        dispatch(clearVoteSessions());
        dispatch(clearVoteModule());
    };

    useEffect((): void => {
        if (!account) return;

        const address = searchParams.get('dao');
        fetchVoteSessions(address);
    }, [searchParams, account])

    const handleChange = (event: React.ChangeEvent<unknown>, page: number): void => {
        setSearchParams({ page: String(page)});
    };

    if(!account) return (
        <div className='homeContainer'>
            <Alert variant="outlined"severity="info">
                Please connect to MetaMask.
            </Alert>
        </div>
    );

    return (
        <div className='homeContainer'>
            <VotesList />
            
            {/* <Pagination
                limit={PAGE_LIMIT}
                total={daosCount}
                handleChange={handleChange}
            /> */}
        </div>
    )
};

export default Votes;