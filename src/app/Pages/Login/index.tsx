import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import { useSnackbar } from "notistack";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";
import EmailValidateInput from "../../Components/EmailValidateInput";
import PasswordInput from "../../Components/PasswordInput";
import { FormDataModel } from "../../Models/FormData";
import Spinner from "../../Components/Spinner";
import SocialButton from "../../Components/SocialButton";

import BackImg from "../../../assets/img/bg.png";
import LogoSvg from "../../../assets/img/Logo.svg";

import Config from "../../../Config";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Action } from "redux-actions";
import { loginActions, setAuthAction } from "actions/auth";
import { ILoingInfo, IAuthInfo } from "types/auth";

const SOCIAL_FACEBOOK_CONNECT_TYPE = 0;
const SOCIAL_GOOGLE_CONNECT_TYPE = 1;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      backgroundSize: "cover",
      display: "flex",
      flexDirection: "column",
      fontSize: "14px",
      backgroundImage: `url(${BackImg})`,
      "& .MuiButton-containedPrimary": {
        color: "#fff",
        paddingLeft: "10px",
        paddingRight: "10px",
        "& img": {
          width: "16px",
          height: "16px",
          marginRight: "5px",
        },
      },
    },
    link: {
      color: "#00aaff",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    logoimg: {
      width: "80%",
      margin: "20px auto 30px",
    },
    LeftSection: {
      "@media(max-width: 1280px)": {
        display: "none",
      },
    },
    LoginGrid: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#5d9cec",
      "@media(max-width: 1280px)": {
        width: "100%",
        flex: "1 1 100%",
        maxWidth: "100%",
      },
    },
    LoginPaper: {
      maxWidth: "480px",
      padding: "20px 30px",
      alignitems: "stretch",
      display: "flex",
      flexDirection: "column",
      margin: theme.spacing(4),

      "@media(max-width: 479px)": {
        margin: theme.spacing(1),
      },
    },
    showpassowrdbtn: {
      position: "absolute",
      padding: "2px",
      right: "25px",
      top: "17px",
      backgroundColor: "#fff",
      zIndex: 999,
    },
    forgetremember: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
    forgetpassword: {
      color: "rgba(0, 0, 0, 0.87)",
      textDecoration: "none",
      "&: hover": {
        textDecoration: "underline",
      },
    },
    register: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& a": {
        marginLeft: "10px",
      },
    },
    Footer: {
      flex: "0 0 30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#23282c",
      background: "#f0f3f5",
      borderTop: "1px solid #e9edf0",
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      "@media(max-width: 479px)": {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
    },
  })
);

interface Props {
  loginAction: (loginInfo: ILoingInfo) => Action<any>;
  setAuthAction: (authInfo: IAuthInfo) => Action<any>;
  isLoading: boolean;
  token: string;
  user: object;
  errMessage: string;
}

interface LocationState {
  requestedPath: string;
}

const LoginPage = ({
  loginAction,
  setAuthAction,
  isLoading,
  token,
  user,
  errMessage,
}: Props): JSX.Element | null => {

  const history = useHistory();
  const location = useLocation<LocationState>();

  useEffect(() => {
    if (token !== null && token !== "") {
      localStorage.setItem("token", token || "");
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [token, user]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    errMessage !== "" &&
      enqueueSnackbar(errMessage, {
        variant: "error",
      });
  }, [enqueueSnackbar, errMessage]);

  const classes = useStyles();

  const [formData, setFormData] = useState<{ [k: string]: FormDataModel }>({
    email: {
      value: "",
      validate: true,
      errorMsg: "",
    },
    password: {
      value: "",
      validate: true,
      errorMsg: "",
      showPassword: false,
    },
  });

  const [remember, setRemeber] = useState(false);


  const storageAuth: IAuthInfo = {
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user") || "{}")
  };

  const loginFromStorage = (token === null || token === "") && storageAuth.token !== null && storageAuth.token !== '' && storageAuth.user !== null

  useEffect(() => {
    loginFromStorage && setAuthAction(storageAuth);
  });

  useEffect(() => {
    if (token !== null && token !== "") {
      history.push(location.state?.requestedPath ?? "/dashboard");
    }
  }, [token, history, location])

  if (loginFromStorage || token) return null;

  const checkValidate = (): boolean => {
    let formDataTemp = { ...formData };
    let isValidate = true;
    Object.keys(formData).forEach((item) => {
      const dataValue = formDataTemp[item];
      if (dataValue.value.length === 0) {
        formDataTemp[item].validate = false;
        formDataTemp[item].errorMsg = "Thif field is required";
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
    loginAction({
      email: formData.email.value,
      password: formData.password.value,
    });
  };

  const handleSocialLogin = (user: any, connectorType: number): void => { };

  const handleSocialLoginFailure = (err: any, connectorType: number): void => {
    console.log(`${connectorType} login error`);
    console.log(err);
  };

  return (
    <div className={classes.root}>
      <Grid container style={{ flex: "1 1 100%" }}>
        <Grid className={classes.LeftSection} item md={6}></Grid>
        <Grid className={classes.LoginGrid} item md={6}>
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
              <Grid item xs={12} style={{ position: "relative" }}>
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
                <SocialButton
                  provider="google"
                  appId={Config.GOOGLE_APP_ID}
                  onLoginSuccess={(user): void => {
                    handleSocialLogin(user, SOCIAL_GOOGLE_CONNECT_TYPE);
                  }}
                  onLoginFailure={(err): void => {
                    handleSocialLoginFailure(err, SOCIAL_GOOGLE_CONNECT_TYPE);
                  }}
                >
                  <img
                    src="https://img.icons8.com/color/48/000000/google-logo.png"
                    alt="google"
                  />
                  Login with Google
                </SocialButton>
              </Grid>
              <Grid item md={6} xs={12}>
                <SocialButton
                  provider="facebook"
                  appId={Config.FACEBOOK_APP_ID}
                  onLoginSuccess={(user): void => {
                    handleSocialLogin(user, SOCIAL_FACEBOOK_CONNECT_TYPE);
                  }}
                  onLoginFailure={(err): void => {
                    handleSocialLoginFailure(err, SOCIAL_FACEBOOK_CONNECT_TYPE);
                  }}
                >
                  <img
                    src="https://img.icons8.com/color/48/000000/facebook-circled.png"
                    alt="google"
                  />
                  Login with Facebook
                </SocialButton>
              </Grid>
              <Grid item xs={12} className={classes.register}>
                Don't have an account?{" "}
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
          </Link>{" "}
          © 2020
        </span>
        <span>Phone:512-846-6035</span>
        <span>
          <a className={classes.link} href="mailto:chris.norton1@blueclerk.com">
            BlueClerk Support
          </a>
        </span>
      </Grid>
      {isLoading && <Spinner />}
    </div>
  );
};

const mapStateToProps = (state: {
  auth: {
    loginApi: {
      isLoading: boolean;
      msg: string;
    };
    token: string;
    user: object;
  };
}) => ({
  isLoading: state.auth.loginApi.isLoading,
  token: state.auth.token,
  user: state.auth.user,
  errMessage: state.auth.loginApi.msg,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginAction: (loginInfo: ILoingInfo) =>
    dispatch(loginActions.fetch(loginInfo)),
  setAuthAction: (authInfo: IAuthInfo) =>
    dispatch(setAuthAction(authInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
