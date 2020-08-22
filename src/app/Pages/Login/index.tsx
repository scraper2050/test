import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Api from '../../../util/Api';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import EmailValidateInput from '../../Components/EmailValidateInput';
import PasswordInput from '../../Components/PasswordInput';
import { FormDataModel } from '../../Models/FormData';
import BackImg from '../../../assets/img/bg.png';
import LogoSvg from '../../../assets/img/Logo.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100vh',
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      fontSize: '14px',
      backgroundImage: `url(${BackImg})`,
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
    LoginGrid: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#5d9cec',
    },
    LoginPaper: {
      width: '480px',
      padding: '20px 30px',
      alignitems: 'stretch',
      display: 'flex',
      flexDirection: 'column',
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
    forgetpassword: {
      color: 'rgba(0, 0, 0, 0.87)',
      textDecoration: 'none',
      '&: hover': {
        textDecoration: 'underline',
      },
    },
    register: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& a': {
        marginLeft: '10px',
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

const LoginPage = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState<{ [k: string]: FormDataModel }>({
    email: {
      value: '',
      validate: true,
      errorMsg: '',
    },
    password: {
      value: '',
      validate: true,
      errorMsg: '',
      showPassword: false,
    },
  });

  const [remember, setRemeber] = useState(false);

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

  const handleClickLogin = (): void => {
    if (!checkValidate()) return;
    Api.post('/login', { email: formData.email.value, password: formData.password.value })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        history.push('/dashboard');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <Grid container style={{ flex: '1 1 100%' }}>
        <Grid item md={6}></Grid>
        <Grid item md={6} className={classes.LoginGrid}>
          <Paper className={classes.LoginPaper}>
            <img className={classes.logoimg} src={LogoSvg} alt="logo" />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <EmailValidateInput
                  id="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  inputData={formData.email}
                  onChange={(emailData: FormDataModel) => {
                    setFormData({
                      ...formData,
                      email: {
                        ...emailData,
                      },
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} style={{ position: 'relative' }}>
                <PasswordInput
                  id="login-password"
                  label="Password"
                  size="small"
                  inputData={formData.password}
                  onChange={(passwordValue: FormDataModel) => {
                    setFormData({
                      ...formData,
                      password: {
                        ...passwordValue,
                      },
                    });
                  }}
                />
              </Grid>
            </Grid>
            <div className={classes.forgetremember}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={(e) => {
                      setRemeber(e.target.checked);
                    }}
                    name="remember"
                    color="primary"
                  />
                }
                label="Remeber Me"
              />
              <Link className={classes.forgetpassword} to="/recover">
                Forget your password?
              </Link>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  type="button"
                  onClick={handleClickLogin}
                >
                  Login
                </Button>
              </Grid>
              <Grid item md={6} xs={12}>
                <Button fullWidth variant="contained" color="primary" size="large">
                  <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google" />
                  Login with Google
                </Button>
              </Grid>
              <Grid item md={6} xs={12}>
                <Button fullWidth variant="contained" color="primary" size="large">
                  <img src="https://img.icons8.com/color/48/000000/facebook-circled.png" alt="google" />
                  Login with Facebook
                </Button>
              </Grid>
              <Grid item xs={12} className={classes.register}>
                Don't have an account?{' '}
                <Link className={classes.link} to="/signup">
                  Register
                </Link>
              </Grid>
            </Grid>
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
    </div>
  );
};

export default LoginPage;
