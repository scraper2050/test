import Alert from '@material-ui/lab/Alert';
import BCEmailValidateInputut from '../../../components/bc-email-validate-input/bc-email-validate-input';
import BCModal from '../../../modals/bc-modal';
import BCPhoneNumberInputut from '../../../components/bc-phone-number-input/bc-phone-number-input';
import BCSocialButtonon from '../../../components/bc-social-button/bc-social-button';
import BCSpinnerer from '../../../components/bc-spinner/bc-spinner';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Config from '../../../../config';
import FormControl from '@material-ui/core/FormControl';
import { FormDataModel } from '../../../models/form-data';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import { IndustryModel } from '../../../models/industry';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import PassowrdInput from '../../../components/bc-password-input/bc-password-input';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { modalTypes } from '../../../../constants';
import styles from './signup.styles';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Api, { setToken, setTokenCustomerAPI, setUser } from 'utils/api';
import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import {setQuickbooksConnection} from "../../../../actions/quickbooks/quickbooks.actions";
import AuthTemplatePage from "../template";


const SOCIAL_FACEBOOK_CONNECT_TYPE = 0;
const SOCIAL_GOOGLE_CONNECT_TYPE = 1;

interface Props {
  classes: any
}

function SignUpPage({ classes }: Props): JSX.Element {
  const history = useHistory();
  const { location } = history;
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
      'value': '',
    };
  };

  const initHiddenData = (): FormDataModel => {
    return {
      'errorMsg': '',
      'validate': true,
      'value': null
    };
  };
  const [isLoading, setLoading] = useState(false);
  const [industries, setIndustries] = useState<IndustryModel[]>([]);
  const [alert, setAlert] = useState<string>('');


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
    'phone_number': initFormData(),
    'isci': initHiddenData(),
    'cid': initHiddenData(),
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


  useEffect(
    () => {
      Api.post('/getIndustries').then(({ data }) => {
        setIndustries(data.industries);
      });
      if (location.search) {
        const items = location.search.substr(1).split('&')
        const data = items.reduce((acc: any, item) => {
          const keyValue = item.split('=');
          if (keyValue.length === 2) {
            acc[keyValue[0]] = keyValue[1];
          }
          return acc;
        }, {})
        setFormData({ ...formData,
          'email': { 'errorMsg': '',
            'validate': true,
            'value': data.email
          },
          'isci': { 'errorMsg': '',
            'validate': true,
            'value': data.isci
          },
          'cid': { 'errorMsg': '',
            'validate': true,
            'value': data.cid
          },
        });
      }
    },


    []
  );
  const handleChangeIndustry = (e: any) => {
    const selectedValue = e.target.value;
    if (selectedValue === '0') {
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
      if (item !== 'cid' && item !== 'isci') {
        if (dataValue.value.length === 0) {
          formDataTemp[item].validate = false;
          formDataTemp[item].errorMsg = 'This field is required';
          isValidate = false;
        }
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
    setAlert('');
  };

  const handleClickSignUp = async () => {
    if (!checkValidate()) {
      return;
    }

    setLoading(true);
    const params = new URLSearchParams();
    params.append('agreedStatus', 'true');

    const signupParams:any = {
      'companyName': formData.company.value,
      'email': formData.email.value,
      'firstName': formData.firstName.value,
      'industryId': formData.industry.value,
      'lastName': formData.lastName.value,
      'password': formData.password.value,
      'phone': formData.phone_number.value
    }
    if (formData.isci.value)
      signupParams.isci = formData.isci.value

    if (formData.cid.value)
      signupParams.cid = formData.cid.value

    Api.post('/signUp', signupParams)
      .then(async res => {
        if (res.data.message === 'Company Email address already registered. Please try with some other email address') {
          setLoading(false);
          setAlert('Account already exists.');
        } else if (res.data.status === 1) {
          setToken(res.data.token);
          setTokenCustomerAPI(res.data.token);
          setUser(JSON.stringify(res.data.user));
          dispatch(setQuickbooksConnection({qbAuthorized: false}));
          axios.create({
            'baseURL': Config.apiBaseURL,
            'headers': {
              'Authorization': res.data.token,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .post('/agreeTermAndCondition', params)
            .then(() => {
              setLoading(false);
              history.push('/');
            });
        } else {
          setLoading(false);
          setAlert(res.data.message);
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
    <AuthTemplatePage isLoading={isLoading}>
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
                  xs={12}>
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
                  xs={12}>
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
                  xs={12}>
                  <BCEmailValidateInputut
                    id={'email'}
                    inputData={formData.email}
                    disabled={formData.isci.value}
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
                  xs={12}>
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
                  xs={12}>
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
                  xs={12}>
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
                        value={'0'}
                        disabled
                      >
                        <em
                          style={{
                            'color': 'rgba(0, 0, 0, 0.5)',
                            'fontSize': '14px'
                          }}>
                          {'Select an industry'}
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
                  xs={12}>
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
                  xs={12}>
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
                  style={{display: 'flex'}}
                  justify='flex-end'
                  md={6}
                  xs={12}>
                  <BCSocialButtonon
                    image={'https://img.icons8.com/color/48/000000/google-logo.png'}
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
                    {'Sign up with Google'}
                  </BCSocialButtonon>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}>
                  <BCSocialButtonon
                    image={'https://img.icons8.com/color/48/000000/facebook-circled.png'}
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

      <BCModal />
      {isLoading && <BCSpinnerer />}
      <Snackbar
        onClose={handleClose}
        open={!!alert}>
        <Alert
          onClose={handleClose}
          severity={'error'}>
          {alert}
        </Alert>
      </Snackbar>
  </AuthTemplatePage>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(SignUpPage);
