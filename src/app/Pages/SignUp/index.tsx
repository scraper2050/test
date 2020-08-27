import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import EmailValidateInput from "../../Components/EmailValidateInput";
import PassowrdInput from "../../Components/PasswordInput";
import PhoneNumberInput from "../../Components/PhoneNumberInput";
import TermsContent from "./Components/TermsContent";
import Spinner from "../../Components/Spinner";
import SocialButton from "../../Components/SocialButton";
import Api, { setToken } from "Utils/Api";
import { FormDataModel } from "../../Models/FormData";
import { IndustryModel } from "../../Models/Industry";

import BackImg from "../../../assets/img/bg.png";
import Typography from "@material-ui/core/Typography";

import Config from "../../../Config";

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
    SignUpGrid: {
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
    SignUpPaper: {
      maxWidth: "768px",
      overflow: "hidden",
      margin: theme.spacing(4),
      "@media(max-width: 479px)": {
        margin: theme.spacing(1),
      },
    },
    Title: {
      "@media(max-width: 540px)": {
        fontSize: "2rem",
      },
    },
    LeftSection: {
      ["@media(max-width: 1280px)"]: {
        display: "none",
      },
    },
    ControlFormBox: {
      padding: "40px 20px 20px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    ButtonFormBox: {
      borderTop: "1px solid #c8ced3",
      background: "#f0f3f5",
      padding: "20px",
    },
    Description: {
      marginBottom: theme.spacing(4),
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
    AgreeTermDiv: {
      display: "flex",
      alignItems: "center",
      height: "100%",
      "& span": {
        cursor: "pointer",
        color: "#00aaff",
        "&:hover": {
          textDecoration: "underline",
        },
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
    login: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "40px",
      "& a": {
        marginLeft: "10px",
        textDecoration: "none",
        color: theme.palette.primary.main,
        "&:hover": {
          textDecoration: "underline",
        },
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

const SignUpPage = (): JSX.Element => {
  const history = useHistory();

  const initFormData = (): FormDataModel => {
    return { value: "", validate: true, errorMsg: "" };
  };
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [industries, setIndustries] = useState<IndustryModel[]>([]);

  useEffect(() => {
    Api.post("/getIndustries").then(({ data }) => {
      console.log(" get industries api res => ", data);
      setIndustries(data.industries);
    });
  }, []);

  const [formData, setFormData] = useState<{ [k: string]: FormDataModel }>({
    firstName: initFormData(),
    lastName: initFormData(),
    email: initFormData(),
    password: { ...initFormData(), showPassword: false },
    phone_number: initFormData(),
    industry: initFormData(),
    company: initFormData(),
  });
  const [agreeTerm, setAgreeTerm] = useState({
    value: false,
    showModal: false,
    showError: false,
  });

  const handleChangeText = (e: any, keyStr: string): void => {
    const strValue = e.target.value;
    const formDataTemp = { ...formData };

    formDataTemp[keyStr] = {
      value: strValue,
      validate: strValue.length > 0 ? true : false,
      errorMsg: strValue.length > 0 ? "" : "This field is required",
    };

    setFormData({
      ...formDataTemp,
    });
  };

  const handleChangeIndustry = (e: any) => {
    const selectedValue = e.target.value;
    if (selectedValue === 0) {
      setFormData({
        ...formData,
        industry: {
          value: selectedValue,
          validate: false,
          errorMsg: "This field is required",
        },
      });
    } else {
      setFormData({
        ...formData,
        industry: {
          value: selectedValue,
          validate: true,
          errorMsg: "",
        },
      });
    }
  };

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
    if (!agreeTerm.value) {
      setAgreeTerm({
        ...agreeTerm,
        showError: true,
      });
      isValidate = false;
    }
    return isValidate;
  };

  const handleClickSignUp = () => {
    if (!checkValidate()) return;

    setLoading(true);

    Api.post("/signUp", {
      email: formData.email.value,
      password: formData.password.value,
      firstName: formData.firstName.value,
      lastName: formData.lastName.value,
      phone: formData.phone_number.value,
      companyName: formData.company.value,
      industryId: formData.industry.value,
    })
      .then((res) => {
        setToken(res.data.token);
        history.push("/dashboard");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
    // Api.post()
  };

  const handleClickSocialSignUp = (connectorType: number) => {
    let socialId = "facebook Id";
    if (connectorType === SOCIAL_GOOGLE_CONNECT_TYPE) socialId = "google id";

    Api.post("/signUpSocial", {
      email: formData.email.value,
      password: formData.password.value,
      firstName: formData.firstName.value,
      lastName: formData.lastName.value,
      phone: formData.phone_number.value,
      companyName: formData.company.value,
      industryId: formData.industry.value,
      socialId: socialId,
      connectorType: connectorType,
    });
  };

  const handleSocialLogin = (user: any, connectorType: number): void => {};

  const handleSocialLoginFailure = (err: any, connectorType: number): void => {
    console.log(`${connectorType} login error`);
    console.log(err);
  };

  return (
    <div className={classes.root}>
      <Grid container style={{ flex: "1 1 100%" }}>
        <Grid className={classes.LeftSection} item md={6}></Grid>
        <Grid className={classes.SignUpGrid} item md={6}>
          <Paper className={classes.SignUpPaper}>
            <Box className={classes.ControlFormBox}>
              <Typography className={classes.Title} variant="h3">
                Create An Account
              </Typography>
              <p className={classes.Description}>
                Please fill in below form to create an account with us
              </p>

              <Grid container spacing={3}>
                <Grid item md={6} xs={6}>
                  <TextField
                    id="firstname"
                    label="First Name"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formData.firstName.value}
                    onChange={(e: any) => handleChangeText(e, "firstName")}
                    error={!formData.firstName.validate}
                    helperText={formData.firstName.errorMsg}
                  />
                </Grid>
                <Grid item md={6} xs={6}>
                  <TextField
                    id="lastName"
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formData.lastName.value}
                    onChange={(e: any) => handleChangeText(e, "lastName")}
                    error={!formData.lastName.validate}
                    helperText={formData.lastName.errorMsg}
                  />
                </Grid>
                <Grid item md={6} xs={6}>
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
                <Grid item md={6} xs={6} style={{ position: "relative" }}>
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
                <Grid item md={6} xs={6}>
                  <PhoneNumberInput
                    id="phone_number"
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
                <Grid item md={6} xs={6}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={!formData.industry.validate}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Industry
                    </InputLabel>
                    <Select
                      label="Industry"
                      inputProps={{
                        name: "industry",
                        id: "outlined-age-native-simple",
                      }}
                      value={formData.industry.value}
                      onChange={handleChangeIndustry}
                    >
                      <MenuItem value={"0"} key={"-1"}>
                        <em
                          style={{
                            color: "rgba(0, 0, 0, 0.5)",
                            fontSize: "14px",
                          }}
                        >
                          Select a industry
                        </em>
                      </MenuItem>
                      {industries.map((item) => {
                        return (
                          <MenuItem value={item._id} key={item._id}>
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
                <Grid item md={6} xs={6}>
                  <TextField
                    id="company"
                    label="Company"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formData.company.value}
                    onChange={(e: any) => handleChangeText(e, "company")}
                    error={!formData.company.validate}
                    helperText={formData.company.errorMsg}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={6}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div className={classes.AgreeTermDiv}>
                    <Checkbox
                      checked={agreeTerm.value}
                      onChange={(e) => {
                        setAgreeTerm({
                          ...agreeTerm,
                          value: !agreeTerm.value,
                          showError: false,
                        });
                      }}
                      name="agree-term"
                      color="primary"
                    />
                    <span
                      onClick={() => {
                        setAgreeTerm({
                          ...agreeTerm,
                          showModal: true,
                        });
                      }}
                      role="button"
                    >
                      Agree with terms of use and privacy
                    </span>
                  </div>
                  {agreeTerm.showError && (
                    <FormHelperText error={true} style={{ marginLeft: "30px" }}>
                      {"Please check terms of use and privacy"}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.ButtonFormBox}>
              <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
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
                    Sign up with Google
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
                      handleSocialLoginFailure(
                        err,
                        SOCIAL_FACEBOOK_CONNECT_TYPE
                      );
                    }}
                  >
                    <img
                      src="https://img.icons8.com/color/48/000000/facebook-circled.png"
                      alt="google"
                    />
                    Sign up with Facebook
                  </SocialButton>
                </Grid>
                <Grid className={classes.login} item md={12} xs={12}>
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
      <Dialog
        open={agreeTerm.showModal}
        onClose={() =>
          setAgreeTerm({
            ...agreeTerm,
            showModal: false,
          })
        }
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <TermsContent />
      </Dialog>
      {isLoading && <Spinner />}
    </div>
  );
};

export default SignUpPage;
