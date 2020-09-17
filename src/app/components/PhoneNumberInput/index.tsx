import React from "react";

import TextField from "@material-ui/core/TextField";

import { FormDataModel } from "../../models/form-data";

interface PhonNumberInputProps {
  id?: string;
  label: string;
  size: "small" | "medium";
  variant?: "outlined" | "filled";
  validate?: boolean;
  inputData: FormDataModel;
  changeData: Function;
}

export default function PhoneNumberInput({
  id = "phone_number",
  label,
  size,
  variant = "outlined",
  validate,
  inputData,
  changeData,
}: PhonNumberInputProps) {
  const getMaskString = (): string => {
    const x = inputData.value
      .replace(/\D/g, "")
      .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    if (!x) return "";
    return !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
  };

  const handleChangeValue = (e: any): void => {
    if (!e.target.value || e.target.value.length === 0) {
      if (validate) {
        changeData({
          value: "",
          validate: false,
          errorMsg: "This field is required",
        });
      } else {
        changeData({
          value: "",
          validate: true,
          errorMsg: "",
        });
      }
    } else {
      const value = e.target.value.match(/\d+/g);
      if (!value) {
        changeData({
          value: "",
          validate: false,
          errorMsg: "This filed must be a valid phone number address",
        });
      } else {
        let strValue = parseFloat(value.join().replace(/,/g, "")).toString();
        if (strValue.length > 10) strValue = strValue.substring(0, 10);
        changeData({
          value: strValue,
          validate: strValue.length === 10 ? true : false,
          errorMsg:
            strValue.length === 10
              ? ""
              : "This filed must be a valid phone number address",
        });
      }
    }
  };

  return (
    <TextField
      id={id}
      label={label}
      size={size}
      variant={variant}
      type={"text"}
      fullWidth
      error={!inputData.validate}
      helperText={inputData.errorMsg}
      value={getMaskString()}
      onChange={handleChangeValue}
    />
  );
}
