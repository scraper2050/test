import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import validator from 'validator';
import { createStyles, makeStyles, Theme, styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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

      '& .MuiTextField-root': {
        width: '100%',
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
  })
);

interface FormDataModel {
  value: any;
  validate: boolean;
  errorMsg: string;
  showPassword?: boolean;
}

const LoginPage = (): JSX.Element => {
  const classes = useStyles();

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

  const handleChangeEmail = (e: any) => {
    let emailData = {
      value: e.target.value,
      validate: true,
      errorMsg: '',
    };

    if (e.target.value.lenth === 0) {
      emailData.validate = false;
      emailData.errorMsg = 'This filed required';
    }

    if (validator.isEmail(emailData.value)) {
      emailData.validate = true;
      emailData.errorMsg = '';
    } else {
      emailData.validate = false;
      emailData.errorMsg = 'This field must be a valid email address';
    }
    setFormData({
      ...formData,
      email: { ...emailData },
    });
  };

  const handleChangePassword = (e: any) => {
    setFormData({
      ...formData,
      password: {
        value: e.target.value,
        validate: e.target.value.length > 0 ? true : false,
        errorMsg: e.target.value.length > 0 ? '' : 'Thie filed is required',
        showPassword: formData.password.showPassword,
      },
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
    });

    if (!isValidate)
      setFormData({
        ...formDataTemp,
      });
    return isValidate;
  };

  const handleClickLogin = (): void => {
    if (!checkValidate()) return;
  };

  return (
    <div className={classes.root} style={{ backgroundImage: `url(${BackImg})` }}>
      <Grid container style={{ flex: '1 1 100%' }}>
        <Grid item md={6}></Grid>
        <LoginGrid item md={6}>
          <LoginPaper>
            <img className={classes.logoimg} src={LogoSvg} alt="logo" />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  size="small"
                  value={formData.email.value}
                  onChange={handleChangeEmail}
                  error={!formData.email.validate}
                  helperText={formData.email.errorMsg}
                />
              </Grid>
              <Grid item xs={12} style={{ position: 'relative' }}>
                <TextField
                  id="password"
                  label="Password"
                  type={formData.password.showPassword ? 'text' : 'password'}
                  variant="outlined"
                  size="small"
                  value={formData.password.value}
                  onChange={handleChangePassword}
                  error={!formData.password.validate}
                  helperText={formData.password.errorMsg}
                />
                <IconButton
                  className={classes.showpassowrdbtn}
                  aria-label="toggle password visibility"
                  onClick={(e): void => {
                    setFormData({
                      ...formData,
                      password: {
                        ...formData.password,
                        showPassword: !formData.password.showPassword,
                      },
                    });
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                >
                  {formData.password.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
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
                <StyledButton variant="contained" color="primary" size="large" type="button" onClick={handleClickLogin}>
                  Login
                </StyledButton>
              </Grid>
              <Grid item md={6} xs={12}>
                <StyledButton variant="contained" color="primary" size="large">
                  <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google" />
                  Login with Google
                </StyledButton>
              </Grid>
              <Grid item md={6} xs={12}>
                <StyledButton variant="contained" color="primary" size="large">
                  <img src="https://img.icons8.com/color/48/000000/facebook-circled.png" alt="google" />
                  Login with Facebook
                </StyledButton>
              </Grid>
              <Grid item xs={12} className={classes.register}>
                Don't have an account?{' '}
                <Link className={classes.link} to="/signup">
                  Register
                </Link>
              </Grid>
            </Grid>
          </LoginPaper>
        </LoginGrid>
      </Grid>
      <Footer>
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
      </Footer>
    </div>
  );
};

const LoginGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#5d9cec',
});

const LoginPaper = styled(Paper)({
  width: '480px',
  padding: '20px 30px',
  alignitems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
});

const StyledButton = styled(Button)({
  color: '#fff',
  width: '100%',
  paddingLeft: '10px',
  paddingRight: '10px',
  fontSize: '14px',
  '& img': {
    width: '18px',
    height: '18px',
    marginRight: '5px',
  },
});

const Footer = styled(Grid)({
  flex: '0 0 30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '24px',
  paddingRight: '24px',
  color: '#23282c',
  background: '#f0f3f5',
  borderTop: '1px solid #e9edf0',
});

export default LoginPage;
