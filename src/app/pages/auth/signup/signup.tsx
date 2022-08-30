import BCSocialButtonon from '../../../components/bc-social-button/bc-social-button';
import Box from '@material-ui/core/Box';
import {Button, MobileStepper} from '@material-ui/core';
import Config from '../../../../config';
import { FormDataModel } from '../../../models/form-data';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {
  DARK_ASH,
  LIGHT_GREY,
  PRIMARY_BLUE
} from '../../../../constants';
import styles from './signup.styles';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Api, { setToken, setTokenCustomerAPI, setUser } from 'utils/api';
import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {setQuickbooksConnection} from "../../../../actions/quickbooks/quickbooks.actions";
import AuthTemplatePage from "../template";
import SignUpAccountType from "./components/signup_type";
import SignUpCompany from "./components/signup_company";
import SignUpDetail from "./components/signup_detail";
import BCModal from "../../../modals/bc-modal";
import BCSpinnerer from "../../../components/bc-spinner/bc-spinner";
import {error} from "../../../../actions/snackbar/snackbar.action";

const SOCIAL_FACEBOOK_CONNECT_TYPE = 0;
const SOCIAL_GOOGLE_CONNECT_TYPE = 1;

interface Props {
  classes: any
}

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

function SignUpPage({ classes }: Props): JSX.Element {
  const history = useHistory();
  const { location } = history;
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const [signedUp, setSigndUp] = useState(false);
  // const [industries, setIndustries] = useState<IndustryModel[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [accountType, setAccountType] = useState(0);
  const [companyId, setCompanyId] = useState<string|null>(null);
  const [formData, setFormData] = useState<{ [k: string]: FormDataModel | any }>({
    'email': initFormData(),
    'recoveryEmail': initFormData(),
    'firstName': initFormData(),
    'lastName': initFormData(),
    'password': {
      ...initFormData(),
      'showPassword': false
    },
    'phone_number': initFormData(),
    'isci': initHiddenData(),
    'cid': initHiddenData(),
    'agreeTerm': {
      ...initFormData(),
      'showModal': false,
    }
  });

  const handleFormDataChange = (key: string, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  }

  useEffect(
    () => {
      // Api.post('/getIndustries').then(({ data }) => {
      //   setIndustries(data.industries);
      // });
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

  const checkSubmitDisabled = (): boolean => {
    for (const item of Object.keys(formData)){
      if (item !== 'cid' && item !== 'isci') {
        if (formData[item].value.length === 0 || !formData[item].validate) {
          return true;
        }
      }
    }
    return false;

  }
  useEffect(() => {
    if(formData.email.value){
      setFormData((prev) => {
        const newFormData = {...prev};
        if(formData.email.value === formData.recoveryEmail.value){
          newFormData.recoveryEmail = {
            ...prev.recoveryEmail,
            validate: false,
            errorMsg: 'This email cannot be the same as primary email'
          };
        }
        return newFormData
      })
    }
  }, [formData.email])
  

  const handleClickSignUp = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append('agreedStatus', 'true');

    const signupParams:any = {
      accountType: accountType.toString(),
      email: formData.email.value,
      recoveryEmail: formData.recoveryEmail.value,
      password: formData.password.value,
      firstName: formData.firstName.value,
      lastName: formData.lastName.value,
      phone: formData.phone_number.value
    }
    switch (accountType) {
      case 1:
        signupParams.companyId = companyId;
        break;
      case 2:
        signupParams.customerId = companyId;
        break;
      case 5:
        signupParams.companyName = companyId;
        break;
    }

    if (formData.isci.value)
      signupParams.isci = formData.isci.value

    if (formData.cid.value)
      signupParams.cid = formData.cid.value

    Api.post('/signUp', signupParams)
      .then(async res => {
        if (res.data.message === 'Email address already registered. Please try with some other email address') {
          setLoading(false);
          dispatch(error('Email already exists.'));
        } else if (res.data.status === 1) {
          if(!res.data.token){
            setSigndUp(true);
            setLoading(false);
          } else {
            // setToken(res.data.token);
            // setTokenCustomerAPI(res.data.token);
            // setUser(JSON.stringify(res.data.user));
            // dispatch(setQuickbooksConnection({qbAuthorized: false}));
            axios.create({
              'baseURL': Config.apiBaseURL,
              'headers': {
                'Authorization': res.data.token,
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
              .post('/agreeTermAndCondition', params)
              .then(() => {
                setSigndUp(true);
                setLoading(false);
                //history.push('/');
              });
          }
        } else {
          setLoading(false);
          dispatch(error(res.data.message));
        }
      })
      .catch((e) => {
        setLoading(false);
        dispatch(error(e.message));
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
    <AuthTemplatePage isLoading={isLoading} success={signedUp}>
      <Paper className={classes.signupPaper}>
        <Box className={classes.ControlFormBox}>
          <Typography
            className={classes.signupTitle}
            variant={'h3'}>
            {'Create An Account'}
          </Typography>
          {activeStep === 0 &&
          <SignUpAccountType onSelect={(type) => {
            setAccountType(type);
            setActiveStep(type === 4 ? 2 : 1);
          }}/>
          }
          {activeStep === 1 &&
            <SignUpCompany accountType={accountType} onSelect={(company) => {
              setCompanyId(company);
              setActiveStep(2);
            }}/>
          }
          {activeStep === 2 &&
          <SignUpDetail formData={formData} onChange={handleFormDataChange}/>
          }
          <BCStepper
            variant="dots"
            steps={3}
            position="static"
            activeStep={activeStep}
            nextButton={activeStep === 2 && <Button
              disabled={checkSubmitDisabled()}
              disableElevation
              onClick={handleClickSignUp}
              size={'medium'}
              variant={'outlined'}>
              Submit
            </Button>}
            backButton={activeStep === 2 && <div style={{width: 70}}>&nbsp;</div>}
          />
        </Box>
        <Box className={classes.ButtonFormBox}>
              <Grid
                container
                spacing={2}>
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
    </AuthTemplatePage>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(SignUpPage);


const BCStepper = withStyles({
  root: {
    width: '100%',
    backgroundColor: 'transparent',
    marginTop: 50,
    '&& .MuiButton-root': {
      color: PRIMARY_BLUE,
      textTransform: 'capitalize',
    },
    '&& .MuiButton-root.Mui-disabled': {
      color: LIGHT_GREY,
    }
  },
  dots: {
    flex: 1,
    justifyContent: 'center',
  },
  dot: {
    backgroundColor: 'transparent',
    border: `1.5px solid ${DARK_ASH}`,
    marginRight: 10,
  },
  dotActive: {
    backgroundColor: DARK_ASH,
    width: 30,
    borderRadius: 8,
  }
})(MobileStepper)
