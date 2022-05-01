import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { getDaoDescription } from '../../redux/reducers/actions';
import { useAppDispatch } from '../../hooks';
import { Citizen, Dao } from '../../types';

type DaoCardProps = {
    // citizen: Citizen
    dao: Dao
};

const CitizenCard = ({ dao }: DaoCardProps) => {
    const { address, name, description } = dao;
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(getDaoDescription(address));
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
            {/* secondary={`${city}, ${age} years old`} */}
        </ListItem>
    )
};

export default CitizenCard;