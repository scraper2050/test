import BCEmailValidateInputut from '../../components/bc-email-validate-input/bc-email-validate-input';
import BCPhoneNumberInputut from '../../components/bc-phone-number-input/bc-phone-number-input';
import BCSocialButtonon from '../../components/bc-social-button/bc-social-button';
import BCSpinnerer from '../../components/bc-spinner/bc-spinner';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert';
import Config from '../../../config';
import FormControl from '@material-ui/core/FormControl';
import { FormDataModel } from '../../models/form-data';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import { IndustryModel } from '../../models/industry';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import PassowrdInput from '../../components/bc-password-input/bc-password-input';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { modalTypes } from '../../../constants';
import styles from './signup.styles';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Api, { setToken, setUser } from 'utils/api';
import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import BCModal from '../../modals/bc-modal';
import axios from 'axios';
import config from '../../../config';
import { loginActions } from 'actions/auth/auth.action';

const SOCIAL_FACEBOOK_CONNECT_TYPE = 0;
const SOCIAL_GOOGLE_CONNECT_TYPE = 1;

interface Props {
  classes: any
}

function SignUpPage({ classes }: Props): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Terms and conditions',
        'removeFooter': true
      },
      'type': modalTypes.TERMS_AND_CONDITION_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const initFormData = (): FormDataModel => {
    return {
      'errorMsg': '',
      'validate': true,
      'value': ''
    };
  };
  const [isLoading, setLoading] = useState(false);
  const [industries, setIndustries] = useState<IndustryModel[]>([]);
  const [alert, setAlert] = useState(false);

  useEffect(
    () => {
      Api.post('/getIndustries').then(({ data }) => {
        console.log(
          ' get industries api res => ',
          data
        );
        setIndustries(data.industries);
      });
    },
    []
  );

  const [formData, setFormData] = useState<{ [k: string]: FormDataModel }>({
    'company': initFormData(),
    'email': initFormData(),
    'firstName': initFormData(),
    'industry': initFormData(),
    'lastName': initFormData(),
    'password': {
      ...initFormData(),
      'showPassword': false
    },
    'phone_number': initFormData()
  });

  const [agreeTerm, setAgreeTerm] = useState({
    'showError': false,
    'showModal': false,
    'value': false
  });

  const handleChangeText = (e: any, keyStr: string): void => {
    const strValue = e.target.value;
    const formDataTemp = { ...formData };

    formDataTemp[keyStr] = {
      'errorMsg': strValue.length > 0
        ? ''
        : 'This field is required',
      'validate': strValue.length > 0,
      'value': strValue
    };

    setFormData({
      ...formDataTemp
    });
  };

  const handleChangeIndustry = (e: any) => {
    const selectedValue = e.target.value;
    if (selectedValue === 0) {
      setFormData({
        ...formData,
        'industry': {
          'errorMsg': 'This field is required',
          'validate': false,
          'value': selectedValue
        }
      });
    } else {
      setFormData({
        ...formData,
        'industry': {
          'errorMsg': '',
          'validate': true,
          'value': selectedValue
        }
      });
    }
  };

  const checkValidate = (): boolean => {
    const formDataTemp = { ...formData };
    let isValidate = true;
    Object.keys(formData).forEach(item => {
      const dataValue = formDataTemp[item];
      if (dataValue.value.length === 0) {
        formDataTemp[item].validate = false;
        formDataTemp[item].errorMsg = 'This field is required';
        isValidate = false;
      }
      if (!dataValue.validate) {
        isValidate = false;
      }
    });

    if (!isValidate) {
      setFormData({
        ...formDataTemp
      });
    }
    if (!agreeTerm.value) {
      setAgreeTerm({
        ...agreeTerm,
        'showError': true
      });
      isValidate = false;
    }
    return isValidate;
  };

  const handleClose = () => {
    setAlert(false);
  }

  const handleClickSignUp = async () => {
    if (!checkValidate()) {
      return;
    }

    setLoading(true);
    const params = new URLSearchParams();
    params.append('agreedStatus', 'true');

    Api.post(
      '/signUp',
      {
        'companyName': formData.company.value,
        'email': formData.email.value,
        'firstName': formData.firstName.value,
        'industryId': formData.industry.value,
        'lastName': formData.lastName.value,
        'password': formData.password.value,
        'phone': formData.phone_number.value
      }
    )
      .then(async (res) => {
        if (res.data.message === "Company Email address already registered. Please try with some other email address") {
          setLoading(false);
          setAlert(true);
        }
        else {
          setToken(res.data.token);
          setUser(JSON.stringify(res.data.user));
          axios.create({
            'baseURL': config.apiBaseURL,
            'headers': {
              'Authorization': res.data.token,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .post('/agreeTermAndCondition', params)
            .then(() => {
              setLoading(false);
              history.push('/')
            });

        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleClickSocialSignUp = (connectorType: number) => { // eslint-disable-line
    let socialId = 'facebook Id';
    if (connectorType === SOCIAL_GOOGLE_CONNECT_TYPE) {
      socialId = 'google id';
    }

    Api.post(
      '/signUpSocial',
      {
        'companyName': formData.company.value,
        'connectorType': connectorType,
        'email': formData.email.value,
        'firstName': formData.firstName.value,
        'industryId': formData.industry.value,
        'lastName': formData.lastName.value,
        'password': formData.password.value,
        'phone': formData.phone_number.value,
        'socialId': socialId
      }
    );
  };

  const handleSocialLogin = (user: any, connectorType: number): void => { };

  const handleSocialLoginFailure = (err: any, connectorType: number): void => {
    console.log(`${connectorType} login error`);
    console.log(err);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        style={{ 'flex': '1 1 100%' }}>
        <Grid
          className={classes.signupLeftSection}
          item
          md={6}
        />
        <Grid
          className={classes.signupGrid}
          item
          md={6}>
          <Paper className={classes.signupPaper}>
            <Box className={classes.ControlFormBox}>
              <Typography
                className={classes.signupTitle}
                variant={'h3'}>
                {'Create An Account'}
              </Typography>
              <p className={classes.Description}>
                {'Please fill in below form to create an account with us'}
              </p>

              <Grid
                container
                spacing={3}>
                <Grid
                  item
                  md={6}
                  xs={6}>
                  <TextField
                    error={!formData.firstName.validate}
                    fullWidth
                    helperText={formData.firstName.errorMsg}
                    id={'firstname'}
                    label={'First Name'}
                    onChange={(e: any) => handleChangeText(
                      e,
                      'firstName'
                    )}
                    size={'small'}
                    type={'text'}
                    value={formData.firstName.value}
                    variant={'outlined'}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={6}>
                  <TextField
                    error={!formData.lastName.validate}
                    fullWidth
                    helperText={formData.lastName.errorMsg}
                    id={'lastName'}
                    label={'Last Name'}
                    onChange={(e: any) => handleChangeText(
                      e,
                      'lastName'
                    )}
                    size={'small'}
                    type={'text'}
                    value={formData.lastName.value}
                    variant={'outlined'}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={6}>
                  <BCEmailValidateInputut
                    id={'email'}
                    inputData={formData.email}
                    label={'Email'}
                    onChange={(newEmail: FormDataModel) => {
                      setFormData({
                        ...formData,
                        'email': { ...newEmail }
                      });
                    }}
                    size={'small'}
                    variant={'outlined'}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  style={{ 'position': 'relative' }}
                  xs={6}>
                  <PassowrdInput
                    id={'password'}
                    inputData={formData.password}
                    label={'Password'}
                    onChange={(newPassword: FormDataModel) => {
                      setFormData({
                        ...formData,
                        'password': { ...newPassword }
                      });
                    }}
                    size={'small'}
                    variant={'outlined'}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={6}>
                  <BCPhoneNumberInputut
                    changeData={(data: FormDataModel) => {
                      setFormData({
                        ...formData,
                        'phone_number': { ...data }
                      });
                    }}
                    id={'phone_number'}
                    inputData={formData.phone_number}
                    label={'Phone Number'}
                    size={'small'}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={6}>
                  <FormControl
                    error={!formData.industry.validate}
                    fullWidth
                    size={'small'}
                    variant={'outlined'}>
                    <InputLabel htmlFor={'outlined-age-native-simple'}>
                      {'Industry'}
                    </InputLabel>
                    <Select
                      inputProps={{
                        'id': 'outlined-age-native-simple',
                        'name': 'industry'
                      }}
                      label={'Industry'}
                      onChange={handleChangeIndustry}
                      value={formData.industry.value}>
                      <MenuItem
                        key={'-1'}
                        value={'0'}>
                        <em
                          style={{
                            'color': 'rgba(0, 0, 0, 0.5)',
                            'fontSize': '14px'
                          }}>
                          {'Select a industry'}
                        </em>
                      </MenuItem>
                      {industries.map(item => {
                        return (
                          <MenuItem
                            key={item._id}
                            value={item._id}>
                            {item.title}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>
                      {formData.industry.errorMsg}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={6}>
                  <TextField
                    error={!formData.company.validate}
                    fullWidth
                    helperText={formData.company.errorMsg}
                    id={'company'}
                    label={'Company'}
                    onChange={(e: any) => handleChangeText(
                      e,
                      'company'
                    )}
                    size={'small'}
                    type={'text'}
                    value={formData.company.value}
                    variant={'outlined'}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  style={{
                    'display': 'flex',
                    'flexDirection': 'column'
                  }}
                  xs={6}>
                  <div className={classes.AgreeTermDiv}>
                    <Checkbox
                      checked={agreeTerm.value}
                      color={'primary'}
                      name={'agree-term'}
                      onChange={() => {
                        setAgreeTerm({
                          ...agreeTerm,
                          'showError': false,
                          'value': !agreeTerm.value
                        });
                      }}
                    />
                    <span
                      onClick={handleClickOpen}
                      role={'button'}>
                      {'I agree with the terms of use and privacy'}
                    </span>
                  </div>
                  {agreeTerm.showError &&
                    <FormHelperText
                      error
                      style={{ 'marginLeft': '30px' }}>
                      {'Please agree to the terms of use and privacy'}
                    </FormHelperText>
                  }
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.ButtonFormBox}>
              <Grid
                container
                spacing={2}>
                <Grid
                  item
                  md={12}
                  xs={12}>
                  <Button
                    color={'primary'}
                    fullWidth
                    onClick={handleClickSignUp}
                    size={'large'}
                    type={'button'}
                    variant={'contained'}>
                    {'Sign Up Now'}
                  </Button>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}>
                  <BCSocialButtonon
                    appId={Config.GOOGLE_APP_ID}
                    onLoginFailure={(err): void => {
                      handleSocialLoginFailure(
                        err,
                        SOCIAL_GOOGLE_CONNECT_TYPE
                      );
                    }}
                    onLoginSuccess={(user): void => {
                      handleSocialLogin(
                        user,
                        SOCIAL_GOOGLE_CONNECT_TYPE
                      );
                    }}
                    provider={'google'}>
                    <img
                      alt={'google'}
                      src={'https://img.icons8.com/color/48/000000/google-logo.png'}
                    />
                    {'Sign up with Google'}
                  </BCSocialButtonon>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}>
                  <BCSocialButtonon
                    appId={Config.FACEBOOK_APP_ID}
                    onLoginFailure={(err): void => {
                      handleSocialLoginFailure(
                        err,
                        SOCIAL_FACEBOOK_CONNECT_TYPE
                      );
                    }}
                    onLoginSuccess={(user): void => {
                      handleSocialLogin(
                        user,
                        SOCIAL_FACEBOOK_CONNECT_TYPE
                      );
                    }}
                    provider={'facebook'}>
                    <img
                      alt={'google'}
                      src={'https://img.icons8.com/color/48/000000/facebook-circled.png'}
                    />
                    {'Sign up with Facebook'}
                  </BCSocialButtonon>
                </Grid>
                <Grid
                  className={classes.login}
                  item
                  md={12}
                  xs={12}>
                  {'Already have an account?'}
                  <Link
                    className={''}
                    to={'/'}>
                    {'Login'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid
        className={classes.signupFooter}
        container>
        <span>
          <Link
            className={classes.link}
            to={'https://www.blueclerk.com'}>
            {'BlueClerk'}
          </Link>
          {' '}
          {'© 2020'}
        </span>
        <span>
          {'Phone:512-846-6035'}
        </span>
        <span>
          <a
            className={classes.link}
            href={'mailto:chris.norton1@blueclerk.com'}>
            {'BlueClerk Support'}
          </a>
        </span>
      </Grid>
      <BCModal />
      {isLoading && <BCSpinnerer />}
      <Snackbar open={alert} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Account already exists.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(SignUpPage);
