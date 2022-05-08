import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, Switch } from "@mui/material";
import MemberCard from '../../components/MemberCard/Component';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { deepOrange, blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import { getPublicDaos, clearDaoNote, clearAddressInvitedMember } from '../../redux/reducers/actions';
import DaosList from '../../components/DaosList/Component';
import Pagination from '../../components/Pagination/Component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { exploreDaoSelector } from './selector';
import { DEFAULT_PAGE, PAGE_LIMIT } from './constants';
import './Component.scss';
import { Member, InviteDaoFormValues } from '../../types';
import { useFormik, FormikProps } from 'formik';
import { inviteToDao } from '../../redux/reducers/actions';
import { validationSchema } from './validation';
import { number } from 'yup';

const ExploreDaos: React.FC = () => {
    const [refresh, setRefresh] = useState(0);
    const [addressToInvite, setAddressToInvite] = useState("");
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [ searchParams, setSearchParams ] = useSearchParams({});
    //const { citizensCount, citizenNote, account } = useAppSelector(homeSelector);
    const { daosCount, daoNote, account } = useAppSelector(exploreDaoSelector);
    const dispatch = useAppDispatch();
    const booleanVal = true;
    // const handleSubmit = (formValues: InviteDaoFormValues, { resetForm }: any): void => {
    //     console.log("Formik handleSubmit");
    //     dispatch(
    //         inviteToDao(formValues.address)
    //     );
    //     setIsFormSubmitted(true);
    //     resetForm();
    // };

    // const formik: FormikProps<InviteDaoFormValues> = useFormik({
    //     initialValues: {
    //         // address: '',
    //     },
    //     validationSchema,
    //     onSubmit: handleSubmit,
    // });    
    // const { errors, touched } = formik;

    const handleNoteClose = (): void => {

        console.log(" handleNoteClose ");
        // dispatch(clearCitizenNote());
        setAddressToInvite("");
        dispatch(clearDaoNote());
        dispatch(clearAddressInvitedMember());
    };

    const HandleInviteMember = () => {
        // setRefresh(false);
        console.log(" HandleInviteMember " + addressToInvite)
        dispatch(inviteToDao(daoNote.address, addressToInvite));
        setAddressToInvite("");
        setRefresh(refresh + 1);
        console.log("success INVITE MEMBER");
    };

    useEffect((): void => {
        if (!account) return;

        const page = searchParams.get('page') || DEFAULT_PAGE;
        // dispatch(getCitizens(Number(page) , PAGE_LIMIT));
        dispatch(getPublicDaos(Number(page) , PAGE_LIMIT));

        console.log(" use effect ");

    }, [searchParams, account, refresh])

    const handleChange = (event: React.ChangeEvent<unknown>, page: number): void => {
        console.log(" handleChange ");
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
            
            {console.log(" daoNote.members " + daoNote.members)}
            {
                 daoNote && (
                    <Dialog onClose={handleNoteClose} open={Boolean(daoNote)} maxWidth="md" fullWidth>
                        <DialogTitle>My DAO</DialogTitle>
                        <DialogContent>
                            {/* <form className='formContainer' onSubmit={formik.handleSubmit}> */}
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
                                            value={daoNote.name}
                                        />
                                    </div>
                                    <div className="textInput">
                                        <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Visibility</FormLabel>
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
                                        </FormControl>
                                    </div>
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
                                    </div>
                                    <div className="textInput">
                                        <TextField
                                            size="small"
                                            fullWidth
                                            id="description"
                                            name="description"
                                            label="Description"
                                            disabled
                                            value={daoNote.description}
                                        />
                                    </div>  
                                    <div className="textInput">
                                        <TextField
                                            size="small"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            id="note"
                                            name="note"
                                            label="Note"
                                            disabled
                                            value={daoNote.description}
                                        />
                                    </div>  
                                    { daoNote.members && (
                                        <div className='listContainer'>
                                            
                                                <Typography variant="h5" component="div">Members</Typography>
                                                <List>
                                                    {
                                                            daoNote.members.map((member: Member) => (
                                                                <MemberCard key={member.id} member={member} />
                                                            ))                                                   
                                                    }
                                                </List> 
                                        </div> 
                                        )
                                    } 
                                    <div className="textInput">

                                    { daoNote.member == 3 && daoNote.membershipMode == 0 && (
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
                            {/* </form>   */}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleNoteClose}>Close</Button>
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

export default ExploreDaos;