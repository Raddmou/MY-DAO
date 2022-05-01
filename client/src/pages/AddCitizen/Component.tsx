import React, { useState } from 'react';
import { useFormik, FormikProps } from 'formik';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { Checkbox, Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import { validationSchema } from './validation';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addNewCitizen, addNewDao } from '../../redux/reducers/actions';
import { AddCitizenFormValues, AddDaoFormValues } from '../../types';
import './Component.scss'

const AddCitizen: React.FC = () => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const { account } = useAppSelector((state: any) => state.application);
    const dispatch = useAppDispatch();

    // const handleSubmit = (formValues: AddCitizenFormValues, { resetForm }: any): void => {
    //     dispatch(
    //         addNewCitizen(formValues)
    //     );
    //     setIsFormSubmitted(true);
    //     resetForm();
    // };

    const handleSubmit = (formValues: AddDaoFormValues, { resetForm }: any): void => {
        dispatch(
            addNewDao(formValues)
        );
        setIsFormSubmitted(true);
        resetForm();
    };

    const formik: FormikProps<AddCitizenFormValues> = useFormik({
        initialValues: {
            //age: '',
            //city: '',
            name: '',
            visibility: false,
            note: '',
        },
        validationSchema,
        onSubmit: handleSubmit,
    });    
    const { errors, touched } = formik;

    if (!account) return (
        <div className='container'>
            <Alert variant="outlined"severity="info">
                Please connect to MetaMask.
            </Alert>
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
                    <FormControlLabel
                    control={
                        <Switch  
                        size="small"
                        fullWidth
                        id="visibility"
                        name="visibility"
                        label="Private"
                        value={formik.values.visibility}
                        onChange={formik.handleChange}
                        error={touched.visibility && Boolean(errors.visibility)}
                        helperText={touched.visibility && errors.visibility}
                    />
                            }
                    label="Private"
                    />
                    
                </div>
                {/* <div className="textInput">
                    <TextField
                        size="small"
                        fullWidth
                        id="age"
                        name="age"
                        label="Age"
                        type="number"
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        error={touched.age && Boolean(errors.age)}
                        helperText={touched.age && errors.age}
                    />
                </div> */}
                {/* <div className="textInput">
                    <TextField
                        size="small"
                        fullWidth
                        id="city"
                        name="city"
                        label="City"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        error={touched.city && Boolean(errors.city)}
                        helperText={touched.city && errors.city}
                    />
                </div> */}
                <div className="textInput">
                    <TextField
                        size="small"
                        fullWidth
                        id="note"
                        name="note"
                        label="Description"
                        value={formik.values.note}
                        onChange={formik.handleChange}
                        error={touched.note && Boolean(errors.note)}
                        helperText={touched.note && errors.note}
                    />
                </div>
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default AddCitizen;