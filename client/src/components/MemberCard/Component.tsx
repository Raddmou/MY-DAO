import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';

import { getDaoNote } from '../../redux/reducers/actions';
import { useAppDispatch } from '../../hooks';
import { Member } from '../../types';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { deepOrange, blue } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

type MemberCardProps = {
    member: Member
};

const MemberCard = ({ member }: MemberCardProps) => {
    const { address, status, id } = member;

    return (
        // <ListItem>
        //     {/* <ListItemAvatar>
        //         <Avatar
        //             sx={{ bgcolor: 'grey' }}
        //         >
        //             { {address}}
        //         </Avatar>
        //     </ListItemAvatar>  */}
        //     <ListItemText primary={`Address ${address}`} />
        // </ListItem>

        // <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            // <ListItem alignItems="flex-start">
            //     <ListItemAvatar>
            //         { status == 3 ? (
            //         <Tooltip title="Active member">
            //                 <IconButton>
            //                     <Avatar 
            //                     sx={{ bgcolor: blue[500] }}
            //                     />
            //                 </IconButton>
            //             </Tooltip> 
            //         ) :  (
            //             <Tooltip title="Pending invitation">
            //                 <IconButton>
            //                 <Avatar
            //                     sx={{ bgcolor: deepOrange[500] }}
            //                     alt="Accept invitation"
            //                 ></Avatar>
            //                 </IconButton>
            //             </Tooltip> 
            //         )
            //         }
            //     {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
            //     </ListItemAvatar>
            //     <ListItemText
            //     primary={address}
            //     />
            // </ListItem>      
        // </List>

        <ListItem button divider>
            <ListItemText primary={address} /> 
            { 
                status == 3 ? (
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
        </ListItem>
        

    )
};

export default MemberCard;