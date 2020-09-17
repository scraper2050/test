import React from "react";

import validator from "validator";
import TextField from "@material-ui/core/TextField";

import { FormDataModel } from "../../models/form-data";

interface EmailValidateInputProps {
  id?: string;
  label?: string;
  size: "small" | "medium";
  variant?: "outlined" | "filled";
  inputData: FormDataModel;
  onChange: Function;
}

const EmailValidateInput = ({
  id = "email",
  label = "Email",
  variant = "outlined",
  size = "small",
  inputData,
  onChange,
}: EmailValidateInputProps) => {
  const handleChangeEmail = (e: any) => {
    const emailData = {
      value: e.target.value,
      validate: true,
      errorMsg: "",
    };

    if (e.target.value.length === 0) {
      emailData.validate = false;
      emailData.errorMsg = "This filed required";
    } else {
      if (validator.isEmail(emailData.value)) {
        emailData.validate = true;
        emailData.errorMsg = "";
      } else {
        emailData.validate = false;
        emailData.errorMsg = "This field must be a valid email address";
      }
    }

    onChange({
      ...emailData,
    });
  };

  return (
    <TextField
      id={id}
      label={label}
      type="email"
      variant={variant}
      size={size}
      fullWidth
      value={inputData.value}
      onChange={handleChangeEmail}
      error={!inputData.validate}
      helperText={inputData.errorMsg}
    />
  );
};

export default EmailValidateInput;
