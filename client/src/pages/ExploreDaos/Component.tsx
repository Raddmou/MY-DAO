import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';

import { getCitizens, clearCitizenNote, getDaoByMember, clearDaoNote } from '../../redux/reducers/actions';
import CitizensList from '../../components/CitizensList/Component';
import Pagination from '../../components/Pagination/Component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { homeSelector } from './selector';
import { DEFAULT_PAGE, PAGE_LIMIT } from './constants';
import './Component.scss';

const ExploreDaos: React.FC = () => {
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
            {
                daoNote && (
                    <Dialog onClose={handleNoteClose} open={Boolean(daoNote)}>
                        <DialogTitle>View dao's note</DialogTitle>
                        <DialogContent>{daoNote }</DialogContent>
                        <DialogActions>
                            <Button onClick={handleNoteClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
                )
            }
            <CitizensList />
            
            <Pagination
                limit={PAGE_LIMIT}
                total={daosCount}
                handleChange={handleChange}
            />
        </div>
    )
};

export default ExploreDaos;