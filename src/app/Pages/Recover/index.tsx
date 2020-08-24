import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import validator from 'validator';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

import LogoSvg from '../../../assets/img/Logo.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      minHeight: '100vh',
      '& .MuiGrid-item': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
      },
      '& .MuiButton-root': {
        color: '#fff',
        width: '100%',
      },
    },
    formPaper: {
      width: '350px',
      padding: '40px 25px 25px',
      margin: theme.spacing(1),
    },
    Logo: {
      width: '60%',
      marginBottom: '20px',
    },
  })
);

interface EmailDataModel {
  value: string;
  validate: boolean;
  errorMsg: string;
}

const RecoverPage = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const [emailData, setEmailData] = useState<EmailDataModel>({
    value: '',
    validate: true,
    errorMsg: '',
  });

  const handleChangeEmail = (e: any): void => {
    const emailStr = e.target.value;
    if (emailStr === 0) {
      setEmailData({
        value: e.target.value,
        validate: false,
        errorMsg: 'This field is required',
      });
    } else {
      if (validator.isEmail(emailStr)) {
        setEmailData({
          value: e.target.value,
          validate: true,
          errorMsg: '',
        });
      } else {
        setEmailData({
          value: e.target.value,
          validate: false,
          errorMsg: 'This field must be a valid email address',
        });
      }
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.formPaper}>
        <Grid container spacing={1} alignItems="center" justify="center">
          <Grid item xs={12}>
            <img className={classes.Logo} src={LogoSvg} alt="logo" />
          </Grid>
          <Grid item xs={12}>
            <strong>PASSWORD RESET</strong>
          </Grid>
          <Grid item xs={12}>
            <p style={{ textAlign: 'center', margin: 0, padding: 0 }}>
              Please enter login email to receive a password reset link
            </p>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '20px' }}>
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              size="small"
              value={emailData.value}
              onChange={handleChangeEmail}
              error={!emailData.validate}
              helperText={emailData.errorMsg}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" size="large">
              Reset
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                history.push('/login');
              }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default RecoverPage;
