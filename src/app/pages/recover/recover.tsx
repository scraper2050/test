import {Box, Button, IconButton, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import styles from './recover.styles';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import { withStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import Api from 'utils/api'
import { useSnackbar } from 'notistack';
import { error, success } from 'actions/snackbar/snackbar.action';
import { useDispatch } from "react-redux";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AuthTemplatePage from "../auth/template";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

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
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [emailData, setEmailData] = useState<EmailDataModel>({
    'errorMsg': '',
    'validate': true,
    'value': ''
  });

  const [errMessage, setErrMessage] = useState<string>('');

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    errMessage !== "" &&
      dispatch(error(errMessage));
    // enqueueSnackbar(errMessage, {
    //   variant: "error",
    // });
  }, [enqueueSnackbar, errMessage]);

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

  const handlePasswordReset = () => {
    if (emailData.value === '') {
      setEmailData({
        'errorMsg': 'This field is required',
        'validate': false,
        'value': ''
      });
    } else if (emailData.validate) {
      setLoading(true);
      Api.post(
        '/forgotPassword',
        { email: emailData.value }
      )
        .then((res) => {
          setLoading(false);
          if (res.data.message === "Invalid email address.") {
            setEmailData({
              'errorMsg': '',
              'validate': true,
              'value': ''
            });
            dispatch(error(res.data.message));
          } else if (res.data.message === "Email sent.") {

            setEmailData({
              'errorMsg': '',
              'validate': true,
              'value': ''
            });
            dispatch(success("Reset password success, please check your email."));
            history.push('/');
          } else {
            setErrMessage(res.data.message);
          }
        })
        .catch((err) => {
          setLoading(false);
          setErrMessage(err.response.data.message);
        });
    }
  }

  return (
    <AuthTemplatePage isLoading={isLoading}>
      <Paper className={classes.paper}>
        <Box className={classes.box}>
          <IconButton
            onClick={() => history.push('/')}
            className={classes.backButton}
          >
            <ArrowBackIosIcon fontSize={'small'} />
          </IconButton>
          <Typography
            className={classes.title}
            variant={'h3'}>
            {'Forget Password'}
          </Typography>
          <p className={classes.description}>
            {'Type in the email you registered for BlueClerk'}
          </p>
          <Grid
            alignItems={'center'}
            container
            justify={'center'}
            spacing={1}>
            <Grid
              item
              style={{ 'marginBottom': '20px' }}
              xs={12}>
              <TextField
                fullWidth
                error={!emailData.validate}
                helperText={emailData.errorMsg}
                id={'email'}
                label={'Email'}
                onChange={handleChangeEmail}
                size={'small'}
                type={'email'}
                value={emailData.value}
                variant={'outlined'}
              />
            </Grid>
            <Grid
              item
              xs={12}>
              <Button
                fullWidth
                color={'primary'}
                size={'large'}
                variant={'contained'}
                onClick={handlePasswordReset}
              >
                retrieve password
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </AuthTemplatePage>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(RecoverPage);
