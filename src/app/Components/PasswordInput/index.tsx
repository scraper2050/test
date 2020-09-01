import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { FormDataModel } from "../../models/FormData";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    showpassowrdbtn: {
      position: "absolute",
      padding: "2px",
      right: "25px",
      top: "17px",
      backgroundColor: "#fff",
      zIndex: 999,
    },
  })
);

interface PasswordInputProps {
  id?: string;
  label?: string;
  size: "small" | "medium";
  variant?: "outlined" | "filled";
  inputData: FormDataModel;
  onChange: Function;
}

const PasswordInput = ({
  id = "password",
  label = "Password",
  variant = "outlined",
  size = "small",
  inputData,
  onChange,
}: PasswordInputProps) => {
  const classes = useStyles();

  const handleChangePassword = (e: any): void => {
    const passwordValue = e.target.value;
    onChange({
      value: passwordValue,
      validate: passwordValue.length > 0 ? true : false,
      errorMsg: passwordValue.length > 0 ? "" : "This field is required",
    });
  };

  return (
    <>
      <TextField
        id={id}
        label={label}
        type={inputData.showPassword ? "text" : "password"}
        variant={variant}
        size={size}
        fullWidth
        value={inputData.value}
        onChange={handleChangePassword}
        error={!inputData.validate}
        helperText={inputData.errorMsg}
      />
      <IconButton
        className={classes.showpassowrdbtn}
        aria-label="toggle password visibility"
        onClick={(e): void => {
          onChange({
            ...inputData,
            showPassword: !inputData.showPassword,
          });
        }}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        {inputData.showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </>
  );
};

export default PasswordInput;
