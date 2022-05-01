import React, { useEffect } from 'react';
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

import { getDaoByMember, clearDaoNote } from '../../redux/reducers/actions';
import DaosList from '../../components/DaosList/Component';
import Pagination from '../../components/Pagination/Component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { homeSelector } from './selector';
import { DEFAULT_PAGE, PAGE_LIMIT } from './constants';
import './Component.scss';

const Home: React.FC = () => {
    const [ searchParams, setSearchParams ] = useSearchParams({});
    //const { citizensCount, citizenNote, account } = useAppSelector(homeSelector);
    const { daosCount, daoNote, account } = useAppSelector(homeSelector);
    const dispatch = useAppDispatch();

    const handleNoteClose = (): void => {
        // dispatch(clearCitizenNote());
        dispatch(clearDaoNote());
    };

    useEffect((): void => {
        if (!account) return;

        const page = searchParams.get('page') || DEFAULT_PAGE;
        // dispatch(getCitizens(Number(page) , PAGE_LIMIT));
        dispatch(getDaoByMember(Number(page) , PAGE_LIMIT));
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
            {console.log("DaoCard " + daoNote)}
            {
                 daoNote && (
                    <Dialog onClose={handleNoteClose} open={Boolean(daoNote)} maxWidth fullWidth>
                        <DialogTitle>My DAO</DialogTitle>
                        <DialogContent>
                            <div>
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
                            </div>    
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

export default Home;