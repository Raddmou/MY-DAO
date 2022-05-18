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
import { getDaoByMember, clearDaoNote, clearVoteSessions, clearVoteModule } from '../../redux/reducers/actions';
import DaosList from '../../components/DaosList/Component';
import Pagination from '../../components/Pagination/Component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { homeSelector } from './selector';
import { DEFAULT_PAGE, PAGE_LIMIT } from './constants';
import './Component.scss';

const Home: React.FC = () => {
    const [addressToInvite, setAddressToInvite] = useState("");
    const [ searchParams, setSearchParams ] = useSearchParams({});
    //const { citizensCount, citizenNote, account } = useAppSelector(homeSelector);
    const { daosCount, daoNote, account, voteSessions, voteModule } = useAppSelector(homeSelector);
    const dispatch = useAppDispatch();

    const handleNoteClose = (): void => {
        // dispatch(clearCitizenNote());
        setAddressToInvite("");
        dispatch(clearDaoNote());
    };

    const handleVoteClose = (): void => {
        // dispatch(clearCitizenNote());
        setAddressToInvite("");
        dispatch(clearVoteSessions());
        dispatch(clearVoteModule());
    };

    useEffect((): void => {
        if (!account) return;

        const page = searchParams.get('page') || DEFAULT_PAGE;
        dispatch(getDaoByMember(Number(page) , PAGE_LIMIT));
    }, [searchParams, account])

    const handleChange = (event: React.ChangeEvent<unknown>, page: number): void => {
        setSearchParams({ page: String(page)});
    };

    const HandleInviteMember = () => {
        console.log(" HandleInviteMember " + addressToInvite)
        dispatch(inviteToDao(daoNote.address, addressToInvite));
        
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
            {console.log("DaoCard " + daoNote)}
            {
                 daoNote && (
                    <Dialog onClose={handleNoteClose} open={Boolean(daoNote)}  maxWidth="md" fullWidth>
                        <DialogTitle>My DAO</DialogTitle>
                        <DialogContent>
                        <Box
                                sx={{
                                    '& > :not(style)': {
                                    m: 2,
                                    },
                                }}
                                >
                                <Typography variant="h5" component="div">General</Typography>
                                <div className="textInput">
                                    <TextField
                                        size="small"
                                        fullWidth
                                        id="name"
                                        name="name"
                                        label="Name"
                                        disabled
                                        value={daoNote.name}
                                    />
                                </div>
                                
                                {/* {daoNote.modules?.some(a => a.type = "MemberModule") && (
                                <div>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Membership mode</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="membershipMode"
                                            value={daoNote.membershipMode}
                                        >
                                            <FormControlLabel value="0" control={<Radio />} label="Invitation" disabled/>                                                         
                                            <FormControlLabel value="2" control={<Radio />} label="Open" disabled/>  
                                            <FormControlLabel value="1" control={<Radio />} label="Request" disabled/>
                                        </RadioGroup>
                                    </FormControl>
                                </div>)} */}
                                <div className="textInput">
                                    <TextField
                                        size="small"
                                        fullWidth
                                        id="description"
                                        name="description"
                                        label="Description"
                                        multiline
                                        rows={4}
                                        disabled
                                        value={daoNote.description}
                                    />
                                </div>
                                <div className="textInput">
                                        <TextField
                                            size="small"
                                            fullWidth
                                            multiline
                                            rows={8}
                                            id="note"
                                            name="note"
                                            label="Rules"
                                            disabled
                                            value={daoNote.note}
                                        />
                                </div>   

                                <div className="textInput">
                                    <FormControlLabel
                                        control={
                                            <Switch  
                                                size="small"
                                                id="visibility"
                                                name="visibility"
                                                disabled
                                                value={daoNote.visibility}
                                            />
                                            }
                                            label="Private"
                                    />
                                    
                                </div>

                                <Typography variant="h5" component="div">Modules</Typography>

                                <FormLabel id="demo-row-radio-buttons-group-label">Membership Modules</FormLabel>
                                <div>
                                    <ToggleButtonGroup
                                        color="primary"
                                        id="member"
                                        name="member"
                                        label="member"
                                        value={daoNote.modules?.find(a => a.type == MODULE_MEMBER_TYPE)?.code}
                                        exclusive
                                        disabled
                                        // aria-label="label"
                                        >
                                        {/* <label>hoho</label> */}
                                        <ToggleButton value={MODULE_MEMBER_CODE_OPEN}>Open</ToggleButton>
                                        <ToggleButton value={MODULE_MEMBER_CODE_INVITE}>Invitation</ToggleButton>
                                        <ToggleButton value={MODULE_MEMBER_CODE_REQUEST}>Request</ToggleButton>
                                        <ToggleButton value="request" disabled>NFT</ToggleButton>
                                        <ToggleButton value="request" disabled>Token</ToggleButton>
                                    </ToggleButtonGroup>
                                </div>

                                { daoNote.modules?.some(a => a.type == MODULE_MEMBER_TYPE) 
                                    && daoNote.members 
                                    && (
                                        <div className='listContainer'>
                                            
                                                <Typography variant="h6" component="div">Members</Typography>
                                                <List>
                                                    {
                                                            daoNote.members.map((member: Member) => (
                                                                <MemberCard key={member.id} 
                                                                member={member} 
                                                                isMember={daoNote.member} 
                                                                daoAddress={daoNote.address}
                                                                codeModule={daoNote.modules?.find(a => a.type == MODULE_MEMBER_TYPE)?.code}/>
                                                            ))                                                   
                                                    }
                                                </List> 
                                        </div> 
                                        )
                                } 

                                <div className="textInput">

                                { daoNote.modules?.some(a => a.type == MODULE_MEMBER_TYPE && a.code == MODULE_MEMBER_CODE_INVITE) 
                                    && daoNote.member == 3 
                                    && (
                                    <ListItem button divider>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            id="name"
                                            name="name"
                                            label="Guest address"
                                            //value={formik.values.address}
                                            value={addressToInvite}
                                            onChange={(e) => setAddressToInvite(e.target.value)}
                                            //onChange={formik.handleChange}
                                            // error={touched.address && Boolean(errors.address)}
                                            // helperText={touched.address && errors.address}
                                        />
                                        {/* <IconButton>
                                            <Avatar 
                                            sx={{ bgcolor: blue[500] }}
                                            alt="Invite" 
                                            />
                                        </IconButton> */}
                                        {/* <GroupAddIcon fontSize="large" color="primary"
                                        type="submit"/> */}
                                        <Button color="primary" variant="contained" fullWidth onClick={HandleInviteMember}>
                                            Add
                                            </Button>   
                                    </ListItem>
                                )}
                                    
                                </div>  

                            </Box>   
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleNoteClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
                )
            }

            {console.log("voteSessions " + voteSessions?.length)}
            {console.log("voteModule " + voteModule?.isCharged)}
            
            {
                 voteModule?.isCharged && (
                    <Dialog onClose={handleVoteClose} open={Boolean(voteModule?.isCharged)}  maxWidth="md" fullWidth>
                        <DialogTitle>Vote Module YES NO</DialogTitle>
                        <DialogContent>
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
                                        disabled
                                        
                                    />
                                </div> 

                                {/* <Typography variant="h5" component="div">General</Typography>
                                <div className="textInput">
                                    <TextField
                                        size="small"
                                        fullWidth
                                        id="name"
                                        name="name"
                                        label="Name"
                                        disabled
                                        value={daoNote.name}
                                    />
                                </div> */}
                                
                                {/* {daoNote.modules?.some(a => a.type = "MemberModule") && (
                                <div>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Membership mode</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="membershipMode"
                                            value={daoNote.membershipMode}
                                        >
                                            <FormControlLabel value="0" control={<Radio />} label="Invitation" disabled/>                                                         
                                            <FormControlLabel value="2" control={<Radio />} label="Open" disabled/>  
                                            <FormControlLabel value="1" control={<Radio />} label="Request" disabled/>
                                        </RadioGroup>
                                    </FormControl>
                                </div>)} */}
                                {/* <div className="textInput">
                                    <TextField
                                        size="small"
                                        fullWidth
                                        id="description"
                                        name="description"
                                        label="Description"
                                        multiline
                                        rows={4}
                                        disabled
                                        value={daoNote.description}
                                    />
                                </div>
                                <div className="textInput">
                                        <TextField
                                            size="small"
                                            fullWidth
                                            multiline
                                            rows={8}
                                            id="note"
                                            name="note"
                                            label="Rules"
                                            disabled
                                            value={daoNote.note}
                                        />
                                </div>   

                                <div className="textInput">
                                    <FormControlLabel
                                        control={
                                            <Switch  
                                                size="small"
                                                id="visibility"
                                                name="visibility"
                                                disabled
                                                value={daoNote.visibility}
                                            />
                                            }
                                            label="Private"
                                    />
                                    
                                </div> */}

                            </Box>   
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleVoteClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
                )
            }



            <DaosList />
            
            <Pagination
                limit={PAGE_LIMIT}
                total={daosCount}
                handleChange={handleChange}
            />
        </div>
    )
};

export default Home;