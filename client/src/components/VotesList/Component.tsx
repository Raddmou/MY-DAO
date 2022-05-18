import React, { useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import VoteCard from '../VoteCard/Component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Dao, VoteSession } from '../../types'
import './Component.scss'
import { VotesSelector } from '../../pages/Votes/selector';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik, FormikProps } from 'formik';
import { AddVoteFormValues } from '../../types';
import { validationSchema } from './validation';
import { addNewVote, fetchVoteSessions } from '../../redux/reducers/actions';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { useSearchParams, Link } from "react-router-dom";

const VotesList: React.FC = () => {
    //const { voteSessions } = useAppSelector(VotesSelector);
    const [searchParams] = useSearchParams({});
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [openAddVoteDialog, setOpenAddVoteDialog] = useState(false);
    const dispatch = useAppDispatch();
    const { voteSessions, voteModule, daoNote } = useAppSelector(VotesSelector);
    const address = searchParams.get('dao');
    const handleSubmit = (formValues: AddVoteFormValues, { resetForm }: any): void => {
        console.log("handleSubmit form add vote start " + address );
        dispatch(
            addNewVote(formValues, address)
        );
        setIsFormSubmitted(true);
        resetForm();
        console.log("handleSubmit form add vote end");
    };

    useEffect((): void => {
        dispatch(
            fetchVoteSessions(address)
        );
    }, [searchParams, isFormSubmitted])

    const formik: FormikProps<AddVoteFormValues> = useFormik({
        initialValues: {
            name: '',
            description: '',
            duration: 0,
        },
        validationSchema,
        onSubmit: handleSubmit,
    });    
    const { errors, touched } = formik;

    const handleNoteClose = (): void => {
        setOpenAddVoteDialog(false);
    };

    const HandleOpenDialog = () => {
        setOpenAddVoteDialog(true);      
    };
    // if (pending) return (
    //     <div className='listContainer'>
    //         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    //             <CircularProgress />
    //         </Box>
    //     </div>
    // );
    // if (error) return <Alert severity="error">Some error happen. Please reload the page.</Alert>

    return (
        <div className='listContainer'>
            {
                isFormSubmitted && (
                    <Alert severity="info">Please confirm creating new vote in MetaMask.</Alert>
                )
            }
            <Typography variant="h5" component="div">Vote sessions</Typography>
            <List>
                {console.log(" voteSession near voteCard " + voteSessions?.length)}
                {
                    voteSessions?.map((voteSession: VoteSession) => (
                        <VoteCard key={voteSession.id} voteSession={voteSession} />
                    ))
                }
            </List>
            <Button variant="contained" endIcon={<AddIcon />}
                onClick={HandleOpenDialog}>
                Create new vote
            </Button>

            {
                openAddVoteDialog && (
                    
                    <Dialog onClose={handleNoteClose} open={Boolean(openAddVoteDialog)}  maxWidth="md" fullWidth>
                        <DialogTitle>Create new vote</DialogTitle>
                        <DialogContent>
                        <form className='formContainer' onSubmit={formik.handleSubmit}>
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
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                error={touched.name && Boolean(errors.name)}
                                                helperText={touched.name && errors.name}
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
                                                value={formik.values.description}
                                                onChange={formik.handleChange}
                                                error={touched.description && Boolean(errors.description)}
                                                helperText={touched.description && errors.description}
                                            />
                                        </div>
                                        <div>
                                            {/* <ToggleButtonGroup
                                                color="primary"
                                                id="member"
                                                name="member"
                                                label="member"
                                                value={formik.values.duration}
                                                exclusive
                                                onChange={formik.handleChange}>
                                                <ToggleButton value={0}>One hour</ToggleButton>
                                                <ToggleButton value={1}>One day</ToggleButton>
                                                <ToggleButton value={2}>One week</ToggleButton>
                                            </ToggleButtonGroup>
                                            */}

                                            <FormControl>
                                                <FormLabel id="demo-row-radio-buttons-group-label">Duration</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="membershipMode"
                                                    value={formik.values.duration}
                                                    onChange={formik.handleChange}
                                                >
                                                    <FormControlLabel value="0" control={<Radio />} label="One hour" />                          
                                                    <FormControlLabel value="2" control={<Radio />} label="One day" /> 
                                                    <FormControlLabel value="1" disabled control={<Radio />} label="One week"/>
                                                </RadioGroup>
                                            </FormControl>
                                        </div>

                                        <Button color="primary" variant="contained" type="submit">
                                            Submit
                                        </Button>
                                
                            </Box>   
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleNoteClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
               
                )
            }
        </div>
    )
};

export default VotesList;