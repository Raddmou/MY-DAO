import React from "react";
import { useSearchParams, Link } from "react-router-dom";

import Box from '@mui/material/Box';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

import { setAccount, getContract, setContract, getDaoByMember } from '../../redux/reducers/actions';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { DEFAULT_PAGE, PAGE_LIMIT } from "./constants";

const Header: React.FC = () => { 
    const [searchParams] = useSearchParams({});
    const { account } = useAppSelector((state: any) => state.application);
    const dispatch = useAppDispatch();

    const handleConnect = async (): Promise<any> => {
        const provider = 
            (window as any).ethereum || 
            (window as any).web3?.currentProvider;
    
        const [ currentAccount ] = await provider.request({
            method: 'eth_requestAccounts'
        });
        // const [ networkVersion ] = await provider.request({
        //     method: 'net_version'
        // });
        const [ chainId ] = await provider.request({
            method: 'eth_chainId'
        });
        const page = searchParams.get('page') || DEFAULT_PAGE;
    
        dispatch(setAccount(currentAccount));
        dispatch(setAccount(chainId));
        dispatch(getDaoByMember(Number(page), PAGE_LIMIT));
    };

    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                            <MenuItem
                                component={Link}
                                to="/"
                            >
                                <Typography textAlign="center">My DAOs</Typography>
                            </MenuItem>
                            {
                                account && (
                                    <MenuItem
                                        component={Link}
                                        to="/explore-daos"
                                    >
                                        <Typography textAlign="center">Explore DAOs</Typography>
                                    </MenuItem>
                                )
                            }
                            {
                                account && (
                                    <MenuItem
                                        component={Link}
                                        to="/add-new-dao"
                                    >
                                        <Typography textAlign="center">Create DAO</Typography>
                                    </MenuItem>
                                )
                            }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        { 
                            account ? (
                                <Typography variant="h6" component="div">{ account }</Typography>
                            ) :  (
                                <Button onClick={handleConnect} color="inherit">Connect to MetaMask</Button>
                            )
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    )
 }

export default Header;