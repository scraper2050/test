import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import validator from 'validator';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import EmailValidateInput from '../../Components/EmailValidateInput';
import PassowrdInput from '../../Components/PasswordInput';
import PhoneNumberInput from '../../Components/PhoneNumberInput';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TermsContent from './Components/TermsContent';

import { FormDataModel } from '../../Models/FormData';

import BackImg from '../../../assets/img/bg.png';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100vh',
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      fontSize: '14px',
      backgroundImage: `url(${BackImg})`,
      '& .MuiCheckbox-root': {
        paddingTop: 0,
        paddingBottom: 0,
      },
      '& .MuiButton-containedPrimary': {
        color: '#fff',
        paddingLeft: '10px',
        paddingRight: '10px',
        '& img': {
          width: '16px',
          height: '16px',
          marginRight: '5px',
        },
      },
    },
    SignUpGrid: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#5d9cec',
    },
    SignUpPaper: {
      width: '768px',
      overflow: 'hidden',
    },
    ControlFormBox: {
      padding: '40px 20px 20px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    ButtonFormBox: {
      borderTop: '1px solid #c8ced3',
      background: '#f0f3f5',
      padding: '20px',
    },
    Description: {
      marginBottom: theme.spacing(4),
    },
    link: {
      color: '#5d9cec',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    logoimg: {
      width: '80%',
      margin: '20px auto 30px',
    },
    showpassowrdbtn: {
      position: 'absolute',
      padding: '2px',
      right: '25px',
      top: '17px',
      backgroundColor: '#fff',
      zIndex: 999,
    },
    forgetremember: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '10px',
    },
    login: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '40px',
      '& a': {
        marginLeft: '10px',
        textDecoration: 'none',
        color: theme.palette.primary.main,
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
    Footer: {
      flex: '0 0 30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: '24px',
      paddingRight: '24px',
      color: '#23282c',
      background: '#f0f3f5',
      borderTop: '1px solid #e9edf0',
    },
  })
);

const SignUpPage = (): JSX.Element => {
  const initFormData = (): FormDataModel => {
    return { value: '', validate: true, errorMsg: '' };
  };
  const classes = useStyles();

  const [formData, setFormData] = useState<{ [k: string]: FormDataModel }>({
    firstName: initFormData(),
    lastName: initFormData(),
    email: initFormData(),
    password: { ...initFormData(), showPassword: false },
    phone_number: initFormData(),
    industry: initFormData(),
    company: initFormData(),
  });
  const [agreeTerm, setAgreeTerm] = useState(false);

  const handleChangeText = (e: any, keyStr: string): void => {
    const strValue = e.target.value;
    const formDataTemp = { ...formData };

    formDataTemp[keyStr] = {
      value: strValue,
      validate: strValue.length > 0 ? true : false,
      errorMsg: strValue.length > 0 ? '' : 'This field is required',
    };

    setFormData({
      ...formDataTemp,
    });
  };

  const checkValidate = (): boolean => {
    let formDataTemp = { ...formData };
    let isValidate = true;
    Object.keys(formData).forEach((item) => {
      const dataValue = formDataTemp[item];
      if (dataValue.value.length === 0) {
        formDataTemp[item].validate = false;
        formDataTemp[item].errorMsg = 'Thif field is required';
        isValidate = false;
      }
      if (!dataValue.validate) isValidate = false;
    });

    if (!isValidate)
      setFormData({
        ...formDataTemp,
      });
    return isValidate;
  };

  const handleClickSignUp = () => {
    if (!checkValidate()) return;
  };

  return (
    <div className={classes.root}>
      <Grid container style={{ flex: '1 1 100%' }}>
        <Grid item md={6}></Grid>
        <Grid item md={6} className={classes.SignUpGrid}>
          <Paper className={classes.SignUpPaper}>
            <Box className={classes.ControlFormBox}>
              <Typography variant="h3">Create An Account</Typography>
              <p className={classes.Description}>Please fill in below form to create an account with us</p>

              <Grid container spacing={3}>
                <Grid item md={6}>
                  <TextField
                    id="firstname"
                    label="First Name"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formData.firstName.value}
                    onChange={(e: any) => handleChangeText(e, 'firstName')}
                    error={!formData.firstName.validate}
                    helperText={formData.firstName.errorMsg}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    id="lastName"
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formData.lastName.value}
                    onChange={(e: any) => handleChangeText(e, 'lastName')}
                    error={!formData.lastName.validate}
                    helperText={formData.lastName.errorMsg}
                  />
                </Grid>
                <Grid item md={6}>
                  <EmailValidateInput
                    id="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    inputData={formData.email}
                    onChange={(newEmail: FormDataModel) => {
                      setFormData({
                        ...formData,
                        email: { ...newEmail },
                      });
                    }}
                  />
                </Grid>
                <Grid item md={6} style={{ position: 'relative' }}>
                  <PassowrdInput
                    id="password"
                    label="Password"
                    variant="outlined"
                    size="small"
                    inputData={formData.password}
                    onChange={(newPassword: FormDataModel) => {
                      setFormData({
                        ...formData,
                        password: { ...newPassword },
                      });
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <PhoneNumberInput
                    label="Phone Number"
                    size="small"
                    inputData={formData.phone_number}
                    changeData={(data: FormDataModel) => {
                      setFormData({
                        ...formData,
                        phone_number: { ...data },
                      });
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <FormControl variant="outlined" fullWidth size="small">
                    <InputLabel htmlFor="outlined-age-native-simple">Industry</InputLabel>
                    <Select
                      label="Industry"
                      inputProps={{
                        name: 'industry',
                        id: 'outlined-age-native-simple',
                      }}
                    >
                      <MenuItem value={0}>
                        <em>Select a industry</em>
                      </MenuItem>
                      <MenuItem value={10}>HVAC</MenuItem>
                      <MenuItem value={20}>Roofing</MenuItem>
                      <MenuItem value={30}>Construction</MenuItem>
                      <MenuItem value={40}>Commercial Services</MenuItem>
                      <MenuItem value={50}>Exercise Equipment</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <TextField
                    id="company"
                    label="Company"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formData.company.value}
                    onChange={(e: any) => handleChangeText(e, 'company')}
                    error={!formData.company.validate}
                    helperText={formData.company.errorMsg}
                  />
                </Grid>
                <Grid item md={6} style={{ display: 'flex', alignItems: 'center' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreeTerm}
                        onChange={(e) => {
                          setAgreeTerm(e.target.checked);
                        }}
                        name="agree-term"
                        color="primary"
                      />
                    }
                    label="Agree with terms of use and privacy"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.ButtonFormBox}>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    type="button"
                    onClick={handleClickSignUp}
                  >
                    Sign Up Now
                  </Button>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Button fullWidth variant="contained" color="primary" size="large">
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google" />
                    Sign up with Google
                  </Button>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Button fullWidth variant="contained" color="primary" size="large">
                    <img src="https://img.icons8.com/color/48/000000/facebook-circled.png" alt="google" />
                    Sign up with Facebook
                  </Button>
                </Grid>
                <Grid className={classes.login} item md={12}>
                  Already have an account?
                  <Link className="" to="/login">
                    Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid container className={classes.Footer}>
        <span>
          <Link className={classes.link} to="https://www.blueclerk.com">
            BlueClerk
          </Link>{' '}
          © 2020
        </span>
        <span>Phone:512-846-6035</span>
        <span>
          <a className={classes.link} href="mailto:chris.norton1@blueclerk.com">
            BlueClerk Support
          </a>
        </span>
      </Grid>
      <Dialog
        open={agreeTerm}
        onClose={() => setAgreeTerm(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <TermsContent />
      </Dialog>
    </div>
  );
};

export default SignUpPage;
