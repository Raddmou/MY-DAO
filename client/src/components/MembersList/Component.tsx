import React from 'react';

import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MemberCard from '../MemberCard/Component';
import { useAppSelector } from '../../hooks';
import { Dao, Member } from '../../types'
import './Component.scss'

const MembersList: React.FC = () => {
    const { daos, pending, error } = useAppSelector((state: any) => state.daos);

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
            <Typography variant="h5" component="div">Members</Typography>
            <List>
                {
                    daos.map((dao: Member) => (
                        <MemberCard key={dao.id} member={dao} />
                    ))
                }
            </List>
        </div>
    )
};

export default MembersList;