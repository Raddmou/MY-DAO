import React, { useEffect, useState } from 'react';
import { useFormik, FormikProps } from 'formik';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { Checkbox, Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { validationSchema } from './validation';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addNewDao } from '../../redux/reducers/actions';
import { AddDaoFormValues } from '../../types';
import './Component.scss'
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const AddDao: React.FC = () => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const { account } = useAppSelector((state: any) => state.application);
    const dispatch = useAppDispatch();
    const handleSubmit = async (formValues: AddDaoFormValues, { resetForm }: any): void => {
        var modules = { member, vote };
        setIsPending(true);
        // console.log("member formik = " + formValues.member)
        // console.log("add dao membership " + formValues.membershipMode);
        await dispatch(
            addNewDao(formValues, modules)
        );
        setIsFormSubmitted(true);
        resetForm();
        setIsPending(false);
        setIsFormSubmitted(false);
        setOpen(true);
    };

    useEffect((): void => {
      // dispatch(
      //     fetchVoteSessions(address)
      // );
  }, [isFormSubmitted])

    const formik: FormikProps<AddDaoFormValues> = useFormik({
      initialValues: {
          //age: '',
          //city: '',
          name: '',
          visibility: true,
          //membershipMode: '0',
          description: '',
          note: '',
          member: '',
          vote: '',
      },
      validationSchema,
      onSubmit: handleSubmit,
  });    
  const { errors, touched } = formik;

    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
          '& .MuiSwitch-thumb': {
            width: 15,
          },
          '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
          },
        },
        '& .MuiSwitch-switchBase': {
          padding: 2,
          '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              opacity: 1,
              backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
          },
        },
        '& .MuiSwitch-thumb': {
          boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
          width: 12,
          height: 12,
          borderRadius: 6,
          transition: theme.transitions.create(['width'], {
            duration: 200,
          }),
        },
        '& .MuiSwitch-track': {
          borderRadius: 16 / 2,
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
          boxSizing: 'border-box',
        },
      }));

      const handleChoiceModule = () => {
          console.log("handleChoiceModule");
      }
    const [member, setMember] = React.useState('web');
    const [vote, setVote] = React.useState('web');

      const handleChangeMembershipModule = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
      ) => {
        console.log("handleChangeMembershipModule");
        setMember(newAlignment);
      };
      const handleChangeMembershipModule2 = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
      ) => {
        console.log("handleChangeMembershipModule");
        setVote(newAlignment);
      };

      const [open, setOpen] = React.useState(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    if (!account) return (
        <div className='container'>
            <Alert variant="outlined"severity="info">
                Please connect to MetaMask.
            </Alert>
        </div>
    );

    if (isPending) return (
      <div className='listContainer'>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
          </Box>
      </div>
    );

    return (
        <div className='container'>
            <Typography variant="h5" component="div">Create new DAO</Typography>
            {
                isFormSubmitted && (
                    <Alert severity="info">Please confirm creating new DAO in MetaMask.</Alert>
                )
            }
            <form className='formContainer' onSubmit={formik.handleSubmit}>
            <Box
                sx={{
                    '& > :not(style)': {
                    m: 2,
                    },
                }}
                >
                    <Typography variant="h6" component="div">General</Typography>
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
                    <div className="textInput">
                        <TextField
                            size="small"
                            fullWidth
                            id="note"
                            name="note"
                            label="Rules"
                            multiline
                            rows={8}
                            value={formik.values.note}
                            onChange={formik.handleChange}
                            error={touched.note && Boolean(errors.note)}
                            helperText={touched.note && errors.note}
                        />
                    </div>
                    <div className="textInput">
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Visibility</FormLabel>
                                <FormControlLabel
                                    control={
                                        <Switch  
                                            size="small"
                                            id="visibility"
                                            name="visibility"
                                            value={formik.values.visibility}
                                            onChange={formik.handleChange}
                                        />
                                        }
                                        label="Private"
                                />     
                        </FormControl>
                        
                    </div>
                    <Typography variant="h6" component="div">Modules</Typography>
                    <FormLabel id="demo-row-radio-buttons-group-label">Membership Modules</FormLabel>
                    <div>
                        <ToggleButtonGroup
                            color="primary"
                            id="member"
                            name="member"
                            label="member"
                            value={member}
                            exclusive
                            onChange={handleChangeMembershipModule}
                            // aria-label="label"
                            >
                            {/* <label>hoho</label> */}
                            <ToggleButton value="open">Open</ToggleButton>
                            <ToggleButton value="invite">Invitation</ToggleButton>
                            <ToggleButton value="request">Request</ToggleButton>
                            <ToggleButton value="nft" disabled>NFT</ToggleButton>
                            <ToggleButton value="token" disabled>Token</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <FormLabel id="demo-row-radio-buttons-group-label">Vote Modules</FormLabel>
                    <div>
                        <ToggleButtonGroup
                            color="primary"
                            id="vote"
                            name="vote"
                            label="vote"
                            value={vote}
                            exclusive
                            onChange={handleChangeMembershipModule2}
                            >
                            <ToggleButton value="votingSimple">Voting yes no</ToggleButton>
                            <ToggleButton value="votingProposition" disabled>Voting proposition</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </Box>
            </form>

            <Stack spacing={2} sx={{ width: '100%' }}>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Dao created succesfully
                </Alert>
              </Snackbar>
           </Stack>

        </div>
    );
};

export default AddDao;