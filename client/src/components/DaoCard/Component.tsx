import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { getDaoNote } from '../../redux/reducers/actions';
import { useAppDispatch } from '../../hooks';
import { Dao } from '../../types';

type DaoCardProps = {
    // citizen: Citizen
    dao: Dao
};

const DaoCard = ({ dao }: DaoCardProps) => {
    const { address, name, description } = dao;
    const dispatch = useAppDispatch();
    
    const handleClick = () => {
        dispatch(getDaoNote(address));
    }

    return (
        <ListItem button divider onClick={handleClick}>
            <ListItemAvatar>
                <Avatar
                    sx={{ bgcolor: 'grey' }}
                    alt={name} 
                >
                    {name.charAt(0).toUpperCase()}
                    {/* {name} */}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} secondary={description} /> 
        </ListItem>
    )
};

export default DaoCard;