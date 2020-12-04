import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import LogoSvg from '../../../assets/img/Logo.svg';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import styles from './recover.styles';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import { withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

interface EmailDataModel {
  value: string;
  validate: boolean;
  errorMsg: string;
}

interface Props {
  classes: any
}

function RecoverPage({ classes }: Props): JSX.Element {
  const history = useHistory();

  const [emailData, setEmailData] = useState<EmailDataModel>({
    'errorMsg': '',
    'validate': true,
    'value': ''
  });

  const handleChangeEmail = (e: any): void => {
    const emailStr = e.target.value;
    if (emailStr === 0) {
      setEmailData({
        'errorMsg': 'This field is required',
        'validate': false,
        'value': e.target.value
      });
    } else if (validator.isEmail(emailStr)) {
      setEmailData({
        'errorMsg': '',
        'validate': true,
        'value': e.target.value
      });
    } else {
      setEmailData({
        'errorMsg': 'This field must be a valid email address',
        'validate': false,
        'value': e.target.value
      });
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.formPaper}>
        <Grid
          alignItems={'center'}
          container
          justify={'center'}
          spacing={1}>
          <Grid
            item
            xs={12}>
            <img
              alt={'logo'}
              className={classes.Logo}
              src={LogoSvg}
            />
          </Grid>
          <Grid
            item
            xs={12}>
            <strong>
              {'PASSWORD RESET'}
            </strong>
          </Grid>
          <Grid
            item
            xs={12}>
            <p style={{
              'margin': 0,
              'padding': 0,
              'textAlign': 'center'
            }}>
              {'Please enter login email to receive a password reset link'}
            </p>
          </Grid>
          <Grid
            item
            style={{ 'marginBottom': '20px' }}
            xs={12}>
            <TextField
              error={!emailData.validate}
              helperText={emailData.errorMsg}
              id={'email'}
              label={'Email'}
              onChange={handleChangeEmail}
              size={'small'}
              style={{ 'width': '100%' }}
              type={'email'}
              value={emailData.value}
              variant={'outlined'}
            />
          </Grid>
          <Grid
            item
            xs={12}>
            <Button
              color={'secondary'}
              size={'large'}
              variant={'contained'}>
              {'Reset'}
            </Button>
          </Grid>
          <Grid
            item
            xs={12}>
            <Button
              color={'primary'}
              onClick={() => {
                history.push('/login');
              }}
              size={'large'}
              variant={'contained'}>
              {'Login'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(RecoverPage);
