import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { getDaoNote } from '../../redux/reducers/actions';
import { useAppDispatch } from '../../hooks';
import { Dao } from '../../types';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { deepOrange, blue } from '@mui/material/colors';

type DaoCardProps = {
    dao: Dao
};

const DaoCard = ({ dao }: DaoCardProps) => {
    const { address, name, description, member } = dao;
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
            { 
                member == 3 ? (
                    <Tooltip title="Active member">
                        <IconButton>
                            <Avatar 
                            sx={{ bgcolor: blue[500] }}
                            />
                        </IconButton>
                    </Tooltip> 
                ) :  (
                    <Tooltip title="Pending invitation">
                        <IconButton>
                            <Avatar
                            sx={{ bgcolor: deepOrange[500] }}
                            alt="Accept invitation"
                        ></Avatar>
                        </IconButton>
                    </Tooltip> 
                )
            }
            {/* <Tooltip title="Active member">
                <IconButton>
                    <Avatar 
                    sx={{ bgcolor: blue[500] }}
                     />
                </IconButton>
            </Tooltip> 
            <Tooltip title="Pending invitation">
                <IconButton>
                    <Avatar
                    sx={{ bgcolor: deepOrange[500] }}
                    alt="Accept invitation"
                ></Avatar>
                </IconButton>
            </Tooltip>  */}
            
        </ListItem>
    )
};

export default DaoCard;