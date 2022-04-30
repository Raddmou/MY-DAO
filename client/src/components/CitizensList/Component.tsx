import React from 'react';

import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CitizenCard from '../CitizenCard/Component';
import { useAppSelector } from '../../hooks';
import { Citizen, Dao } from '../../types'
import './Component.scss'

const CitizensList: React.FC = () => {
    const { daos, pending, error } = useAppSelector((state: any) => state.citizens);

    if (pending) return (
        <div className='listContainer'>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        </div>
    );
    if (error) return <Alert severity="error">Some error happen. Please reload the page.</Alert>

    return (
        <div className='listContainer'>
            <Typography variant="h5" component="div">DAO List</Typography>
            <List>
                {
                    daos.map((dao: Dao) => (
                        <CitizenCard key={dao.id} dao={dao} />
                    ))
                }
            </List>
        </div>
    )
};

export default CitizensList;